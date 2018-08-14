export interface Course {
  id: number;
  title: string;
  author: string;
  description: string;
  topic: string;
  url: string;
}

export interface Query {
  allCourses: Course[];
}
