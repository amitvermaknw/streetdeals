import { useState, useRef, useEffect } from 'react';


const ReadMore = ({ content }: { content: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showReadMoreBtn, setShowReadMoreBtn] = useState(false);
    const contentRef = useRef<HTMLParagraphElement>(null);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        if (contentRef.current) {
            if (contentRef.current.scrollHeight > contentRef.current.clientHeight) {
                setShowReadMoreBtn(true);
            } else {
                setShowReadMoreBtn(false);
            }
        }
    }, []);

    return (
        <>
            <p className={`mb-2 text-gray-500 text-sm dark:text-gray-400 ${isExpanded ? 'line-clamp-none' : 'line-clamp-1'} overflow-hidden`} ref={contentRef}>
                {content}
            </p>
            {showReadMoreBtn ? <a className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500" onClick={toggleReadMore}>{isExpanded ? 'Read Less' : 'Read More'}</a> : ''}
        </>
    );
};

export default ReadMore;