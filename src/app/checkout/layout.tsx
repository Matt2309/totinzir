// app/special/layout.tsx
import '@/app/globals.css';

export default function SpecialLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-detail min-h-screen">
            {children}
        </div>
    );
}
