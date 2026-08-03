"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

const motionMap = {
    div: m.div,
    p: m.p,
    h1: m.h1,
    h2: m.h2,
    h3: m.h3,
    ul: m.ul,
    li: m.li,
    article: m.article,
    figure: m.figure,
    span: m.span,
    button: m.button,
    header: m.header,
} as const;

export type MotionTag = keyof typeof motionMap;

type RevealProps = HTMLMotionProps<"div"> & {
    as?: MotionTag;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
};

export function Reveal({
    as = "div",
    children,
    ref,
    ...props
}: RevealProps) {
    const MotionTag = motionMap[as];

    return (
        <LazyMotion features={domAnimation}>
            <MotionTag ref={ref as never} {...(props as never)}>
                {children}
            </MotionTag>
        </LazyMotion>
    );
}
