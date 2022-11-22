import { IDropdownOption } from "@fluentui/react";
import * as _ from "lodash";
import { createContext } from "react";

interface IIssue {
    id: number;
    title: string;
}
interface IArea {
    id: number;
    area: string;
    issues?: IIssue[];
}
interface IProject {
    id: string;
    project: string;
    areas?: IArea[];
}
export interface IAzureDevOpsService {
    getProjects(p1: string, p2: string): Promise<IDropdownOption[]>;
    getAreas(p1: string, p2: string): Promise<IDropdownOption[]>;
    getIssues(p1: string, p2: string): Promise<IDropdownOption[]>;
}
export class AzureDevOpsService implements IAzureDevOpsService {
    private static _data: IProject[] = require("./AzureDevOps.json") as IProject[];

    public getProjects(p1: string, p2: string): Promise<IDropdownOption[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const result: IDropdownOption[] = AzureDevOpsService._data.map(d => { return { key: d.id, text: d.project } });
                resolve(result);
            }, 1000);
        });
    }
    public getAreas(p1: string, p2: string): Promise<IDropdownOption[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const project = _.find(AzureDevOpsService._data, { id: p1 }) as IProject;
                if (project) {
                    const result: IDropdownOption[] = project.areas.map(d => { return { key: d.id, text: d.area } });
                    resolve(result);
                }
            }, 1000);
        });
    }
    public getIssues(p1: string, p2: string): Promise<IDropdownOption[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const project = _.find(AzureDevOpsService._data, { id: p1 }) as IProject;
                if (project) {
                    const area = _.find(project.areas, { id: p2 }) as IArea;
                    if (area) {
                        const result = area.issues.map(d => { return { key: d.id, text: d.title } });
                        resolve(result);
                    }
                }
            }, 1000);
        });
    }
}

export const AzureDevOpsServiceContext = createContext<AzureDevOpsService>(null);
