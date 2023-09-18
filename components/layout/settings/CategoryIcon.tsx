import dynamic from 'next/dynamic'
import { Loader2, LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { memo } from 'react';

interface IconProps extends LucideProps {
    name: string;
}

const Icon = memo(({ name, ...props }: IconProps) => {
    const LucideIcon = dynamic(dynamicIconImports[name as keyof typeof dynamicIconImports], {
        loading: () => (
            <div className='animate-spin'>
                <Loader2 size={20} />
            </div>
        )
    })

    return <LucideIcon {...props} />;
});

export default Icon;