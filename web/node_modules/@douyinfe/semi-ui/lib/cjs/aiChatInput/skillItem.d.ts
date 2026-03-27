import React, { ReactNode } from 'react';
import { RenderSkillItemProps, Skill } from './interface';
interface SkillItemProps {
    skill?: Skill;
    renderSkillItem?: (props: RenderSkillItemProps) => ReactNode;
    isActive?: boolean;
    onClick?: (skill: Skill) => void;
    index?: number;
    onMouseEnter?: (index: number) => void;
}
declare const SkillItem: React.MemoExoticComponent<(props: SkillItemProps) => React.JSX.Element>;
export default SkillItem;
