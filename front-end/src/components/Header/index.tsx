interface IHeaderProps {
  title: string;
}

export function Header({ title }: IHeaderProps) {
  return (
    <header className="w-screen h-20  flex items-center justify-center shadow-lg shadow-black bg-red-900 ">
      <h1 className="text-5xl text-cyan-50 font-righteous">{title}</h1>
    </header>
  );
}
