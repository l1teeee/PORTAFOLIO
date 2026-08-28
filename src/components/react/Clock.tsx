// src/components/react/Clock.tsx
import { useEffect, useState } from "react";

const TIME_ZONE = "America/El_Salvador";

function readLocalTime(): { hour: string; minute: string } {
    const parts = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: TIME_ZONE,
    }).formatToParts(new Date());
    const pick = (type: string) => parts.find((part) => part.type === type)?.value ?? "--";
    return { hour: pick("hour"), minute: pick("minute") };
}

export function Clock() {
    const [time, setTime] = useState({ hour: "--", minute: "--" });

    useEffect(() => {
        const tick = () => setTime(readLocalTime());
        tick();
        const id = window.setInterval(tick, 15000);
        return () => window.clearInterval(id);
    }, []);

    return (
        <p className="absolute bottom-[9px] right-[30px] hidden text-[10px] font-semibold leading-none opacity-60 md:block">
            San Salvador {time.hour}
            <span className="animate-pulse">:</span>
            {time.minute}
        </p>
    );
}
