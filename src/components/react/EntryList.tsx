// src/components/react/EntryList.tsx
export interface Entry {
    title: string;
    meta: string;
    detail?: string;
    url: string;
}

interface EntryListProps {
    entries: Entry[];
    titleSize: "lg" | "md";
}

const TITLE_SIZE = {
    lg: "text-[clamp(2rem,4.2vw,3.6rem)]",
    md: "text-[clamp(1.8rem,3.6vw,3.2rem)]",
};

function EntryBody({ entry, titleSize }: { entry: Entry; titleSize: "lg" | "md" }) {
    return (
        <>
            <h3
                className={`${TITLE_SIZE[titleSize]} font-extralight leading-[0.95] tracking-[-0.02em] transition-opacity duration-500 group-hover:opacity-40`}
            >
                {entry.title}
            </h3>
            <p className="text-halo mt-2 text-[10px] font-semibold leading-[1.4] opacity-60 md:mt-[10px]">{entry.meta}</p>
            {entry.detail && (
                <p className="entry-detail text-halo text-[10px] font-semibold leading-[1.4]">{entry.detail}</p>
            )}
        </>
    );
}

// Right-aligned scrolling list. On mobile it starts below the header so scrolled items never pass behind the name.
export function EntryList({ entries, titleSize }: EntryListProps) {
    return (
        <div className="pointer-events-auto absolute inset-x-0 bottom-0 top-[80px] flex justify-end md:top-0">
            <ul className="list-fade h-full w-full space-y-10 overflow-y-auto pb-10 pt-24 text-right scrollbar-hide md:w-auto md:max-w-[75%] md:space-y-12 md:pb-[60px] md:pt-[110px]">
                {entries.map((entry) => (
                    <li key={entry.title} className="group relative hover:z-10" data-reveal>
                        {entry.url ? (
                            <a href={entry.url} target="_blank" rel="noopener noreferrer" className="block">
                                <EntryBody entry={entry} titleSize={titleSize} />
                            </a>
                        ) : (
                            <div tabIndex={entry.detail ? 0 : undefined}>
                                <EntryBody entry={entry} titleSize={titleSize} />
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
