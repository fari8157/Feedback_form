// types.ts
export interface InputProps {
    text: string;
    example: string;
    name: string;
    setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
    value:string
  }
  