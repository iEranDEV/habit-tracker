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
            <div className='flex justify-center items-center'>
                <Loader2 size={20} className='animate-spin margin-0' />
            </div>
        )
    })

    return <LucideIcon {...props} size={20} />;
});

Icon.displayName = 'CategoryIcon'

export default Icon;