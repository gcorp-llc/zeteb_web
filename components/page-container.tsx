export const PageContainer = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-9 pb-32 animate-ios-in">
      <div className="min-h-[400px]">
        {children}
      </div>
    </div>
  );
};
