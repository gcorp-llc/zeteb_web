export const PageContainer = ({
  title,
  children
}: {
  title: string;
  children: React.ReactNode
}) => {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-32 animate-ios-in">
      <h1 className="text-4xl font-black mb-8">{title}</h1>
      <div className="min-h-[400px]">
        {children}
      </div>
    </div>
  );
};
