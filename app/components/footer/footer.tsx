export const Footer = () => {
  return (
    <footer className="w-full py-6 mt-12 border-t border-border bg-background text-foreground text-center font-secondary text-sm">
      <span>
        &copy; {new Date().getFullYear()} Resident Evil Village. All rights
        reserved.
      </span>
    </footer>
  );
};
