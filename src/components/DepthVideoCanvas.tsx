import React, { useRef, useEffect } from 'react';

interface DepthVideoCanvasProps {
  src: string;
  poster?: string;
  className?: string;
}

export const DepthVideoCanvas: React.FC<DepthVideoCanvasProps> = ({ src, poster, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    // Vertex shader
    const vsSource = `
      attribute vec2 a_pos;
      attribute vec2 a_tex;
      varying vec2 v_tex;
      void main() {
        gl_Position = vec4(a_pos, 0.0, 1.0);
        v_tex = a_tex;
      }
    `;

    // Fragment shader: converts dark/black pixels to transparent alpha with smooth feather
    const fsSource = `
      precision mediump float;
      uniform sampler2D u_image;
      varying vec2 v_tex;
      void main() {
        vec4 col = texture2D(u_image, v_tex);
        float luma = max(col.r, max(col.g, col.b));
        float alpha = smoothstep(0.03, 0.16, luma);
        gl_FragColor = vec4(col.rgb, alpha);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Quad geometry
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1, 0, 1,
         1, -1, 1, 1,
        -1,  1, 0, 0,
        -1,  1, 0, 0,
         1, -1, 1, 1,
         1,  1, 1, 0,
      ]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, 'a_pos');
    const aTex = gl.getAttribLocation(program, 'a_tex');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(aTex);
    gl.vertexAttribPointer(aTex, 2, gl.FLOAT, false, 16, 8);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let animId: number;
    let isMounted = true;

    const render = () => {
      if (!isMounted) return;
      if (video.readyState >= 2) {
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth || 540;
          canvas.height = video.videoHeight || 720;
          gl.viewport(0, 0, canvas.width, canvas.height);
        }
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      animId = requestAnimationFrame(render);
    };

    video.play().catch(() => {});
    animId = requestAnimationFrame(render);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div className={`relative ${className || ''}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        crossOrigin="anonymous"
        className="hidden"
      />
      <canvas ref={canvasRef} className="w-full h-full object-contain pointer-events-none" />
    </div>
  );
};

export default DepthVideoCanvas;
