export interface Education {
    degree: string;
    institution: string;
    university?: string;
    location: string;
    year: string;
    color: 'blue' | 'emerald';
}

export const educationData: Education[] = [
    {
        degree: "B.E Computer Engineering",
        institution: "Vishwakarma Government Engineering College",
        university: "Gujarat Technological University (GTU)",
        location: "Ahmedabad",
        year: "2020-2024",
        color: "blue"
    },
    {
        degree: "H.S.C. PCM",
        institution: "Navrang Higher Secondary School",
        university: "Physics, Chemistry, Mathematics",
        location: "Ahmedabad",
        year: "2018-2020",
        color: "emerald"
    }
];
