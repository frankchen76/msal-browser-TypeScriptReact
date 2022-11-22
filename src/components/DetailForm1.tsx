// demonstrate Function component
import { DetailsHeader, DetailsRow, DetailsRowCheck, FontIcon, getFocusStyle, getTheme, GroupedList, IButtonStyles, IColumn, IconButton, IDetailsHeaderProps, IDetailsRowCheckProps, IGroup, IGroupHeaderProps, Label, Link, List, mergeStyleSets, SelectionMode, ShimmeredDetailsList, Stack } from "@fluentui/react";
import * as React from "react";
import { useState, useEffect } from "react";

export interface IDetailForm1Props {
    title: string;
}
interface IIssue {
    id: string;
    title: string;
    createdDate: string;
    state: string;
    group: string;
}

export const DetailForm1 = (props: IDetailForm1Props) => {
    const [items, setItems] = useState([]);
    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const _loadItems = (): Promise<IIssue[]> => {
        return new Promise<IIssue[]>((resolve, reject) => {
            setTimeout(() => {
                let result: IIssue[] = [];
                let groupId = 1;
                for (let i = 0; i < 20; i++) {
                    if (i % 4 == 0) {
                        groupId++;
                    }
                    result.push({
                        id: (i + 1).toString(),
                        title: `Researched ACS App governance and Sites.selected permission Researched ACS App governance and Sites ${i}`,
                        createdDate: "3 days ago",
                        state: "To Do",
                        group: `Group${groupId}`
                    })
                }
                resolve(result);
            }, 500);
        });
    }
    useEffect(() => {
        // const a = await _loadItems();
        // _loadItems().then(result=>{
        //     setItems(result);
        // });
        const fetchData = async () => {
            setIsLoading(true);
            const data = await _loadItems();
            setItems(data);
            let tempGroups: IGroup[] = [];
            const sortedItems = data.sort((a, b) => { return a.group.toLowerCase().localeCompare(b.group.toLowerCase()); });

            sortedItems.forEach((item: IIssue, index: number, array: IIssue[]) => {
                let existGroup = tempGroups.find(g => g.key == item.group);
                if (!existGroup) {
                    existGroup = {
                        key: item.group,
                        name: item.group,
                        startIndex: index,
                        count: 1,
                        level: 0
                    };
                    tempGroups.push(existGroup);
                } else {
                    existGroup.count++;
                }
            });
            setGroups(tempGroups);
            setIsLoading(false);
        }

        fetchData();
    }, []);//load at the first time

    const classNames = mergeStyleSets({
        itemCell: [
            getFocusStyle(getTheme(), { inset: -1 }),
            {
                // minHeight: 54,
                // padding: 10,
                // boxSizing: 'border-box',
                // borderBottom: `1px solid ${getTheme().semanticColors.bodyDivider}`,
                // display: 'flex',
                selectors: {
                    '&:hover': { background: getTheme().palette.neutralLight },
                },
            }
        ]
    });
    const _onRenderHeader = (props?: IGroupHeaderProps): JSX.Element | null => {
        if (props) {
            const toggleCollapse = (): void => {
                props.onToggleCollapse!(props.group!);
            };
            return (
                <div>
                    This is a custom header for {props.group!.name}
                    &nbsp; (
                    <Link
                        // eslint-disable-next-line react/jsx-no-bind
                        onClick={toggleCollapse}
                    >
                        {props.group!.isCollapsed ? 'Expand' : 'Collapse'}
                    </Link>
                    )
                </div>
            );
        }

        return null;
    };

    const _onRenderCell = (nestingDepth?: number, item?: IIssue, itemIndex?: number): React.ReactNode => {
        return item ? (
            <div className={`${classNames.itemCell} ms-Grid`} dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm1">
                        <IconButton iconProps={{ iconName: "Mail" }} title={"Email task"} />
                    </div>
                    <div className="ms-Grid-col ms-sm9">
                        <Link style={{ textOverflow: "ellipsis" }} title={item.title} to={`/issueitem/${item.id}`}>2245.{item.title}</Link>
                    </div>
                    <div className="ms-Grid-col ms-sm2" style={{ paddingTop: 10 }}>
                        <span className="ms-Icon ms-Icon--WorkItemBarSolid" style={{ width: 6, fontSize: 14 }} aria-hidden="true"></span>
                        <span className="ms-Icon ms-Icon--WorkItemBarSolid" style={{ width: 6, fontSize: 14 }} aria-hidden="true"></span>
                        <span className="ms-Icon ms-Icon--WorkItemBar" style={{ width: 6, fontSize: 14 }} aria-hidden="true"></span>
                    </div>
                </div>
                <div className="ms-Grid-row" style={{ fontSize: 10 }}>
                    {/* <div className="ms-Grid-col ms-sm2 ms-smPush1">
                        2245
                    </div> */}
                    <div className="ms-Grid-col ms-sm4 ms-smPush1">
                        <span style={{ fontWeight: "bold" }}>Hours: </span>10 hr
                    </div>
                    <div className="ms-Grid-col ms-sm4 ms-smPush1">
                        <span style={{ fontWeight: "bold" }}>Created: </span>113 days ago
                    </div>
                    <div className="ms-Grid-col ms-sm4 ms-smPush1">
                        <span style={{ fontWeight: "bold" }}>Due: </span>08/11/2021
                    </div>
                </div>
            </div>
        ) : null;
    };
    const _onRenderCell1 = (item: IIssue, index: number | undefined): JSX.Element => {
        return (
            <div className={classNames.itemCell} data-is-focusable={true}>
                <Link title={item.title} to={`/issueitem/${item.id}`}>{item.title}</Link>
            </div>
        );
    };
    return (
        <div className="ms-Grid">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                    <h2>{props.title}</h2>
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <GroupedList items={items}
                        onRenderCell={_onRenderCell}
                        // groupProps={{ onRenderHeader: _onRenderHeader }}
                        selectionMode={SelectionMode.none}
                        groups={groups} />
                    {/* <List items={items} onRenderCell={_onRenderCell1} /> */}
                </div>
            </div>
        </div>
    );
}
