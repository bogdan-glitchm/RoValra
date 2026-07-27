import { useEffect, useRef } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";
import { addTooltip } from "../../../core/ui/tooltip.js";

type SettingTemplate = {
    type: "checkbox",
    label: string,
    preview_type?: "tooltip",
    default: unknown
};

function RenderInputFromType(type: SettingTemplate["type"]): JSX.Element {
    if (type === undefined || type === "checkbox") {
        return <input type="checkbox"/>
    }
    throw new Error(`Invalid input type: ${type}.`);
}

function RenderSettingPreview(preview_type?: SettingTemplate["preview_type"]) {
    if (preview_type === undefined)
        return <></>;
    else if (preview_type === 'tooltip') {
        const divRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const div = divRef.current;

            if (!div) return;

            addTooltip(div, 'Example Text');
        }, []);

        return <div ref={divRef}>

        </div>
    }
    else {
        throw new Error(`Invalid preview type: ${preview_type}.`);
    }
}

export function RenderSetting(id: number, data: SettingTemplate): JSX.Element {
    const setting = <div id={`pers-setting-${id}`} class="pers-setting-container">
        <div class="pers-setting">
            <p>{data.label}</p>
            {RenderInputFromType(data.type)}
        </div>
        <div class="pers-setting-preview">
            {RenderSettingPreview()}
        </div>
    </div>;

    return setting;
}

export function ContentDiv(settings: JSX.Element[]): JSX.Element {
    const con = <div id="pers-main-container">
        ...settings
    </div>;

    return con;
};
