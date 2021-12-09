// demonstrate Function component
import { DetailsHeader, DetailsRow, DetailsRowCheck, FontIcon, IButtonStyles, IColumn, IconButton, IDetailsHeaderProps, IDetailsRowCheckProps, IGroup, Link, SelectionMode, ShimmeredDetailsList } from "@fluentui/react";
import * as React from "react";

export interface IDetailFormProps {
    title: string;
}
interface IIssue {
    id: string;
    title: string;
    createdDate: string;
    state: string;
    group: string;
}

export const DetailForm: React.FC<IDetailFormProps> = (props) => {
    const [items, setItems] = React.useState([]);
    const [groups, setGroups] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
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
                        title: `Test Title ${i}`,
                        createdDate: "2021/08/08 04:16:00PM",
                        state: "To Do",
                        group: `Group${groupId}`
                    })
                }
                resolve(result);
            }, 500);
        });
    }
    React.useEffect(() => {
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

    const columns: IColumn[] = [
        {
            key: "icon",
            name: "icon",
            isIconOnly: true,
            minWidth: 16,
            maxWidth: 16
            // onRender: (item: IIssue) => {
            //     // const iconProps: IIconProps = {
            //     //     iconName: "IssueTracking"
            //     // };
            //     //return <IconButton iconProps={iconProps} title={item.outlookMessageId ? "Email task" : "Task"} onClick={this._onIconClickHandler.bind(this, item)} />;
            //     return <FontIcon iconName="IssueTracking" />;
            // }
        },
        {
            key: "title",
            name: "Title",
            fieldName: "title",
            minWidth: 100
            // onRender: (item: ITask) => {
            //     return (
            //         <Stack>
            //             <Link title={item.title} to={`/mailitem/${item.id}`}>{item.title}</Link>
            //             <Label>{item.state}</Label>
            //         </Stack>
            //     );
            // }
        },
        {
            key: "createdDate",
            name: "CreatedDate",
            fieldName: "createdDate",
            minWidth: 80,
            maxWidth: 80
        },
        {
            key: "state",
            name: "state",
            fieldName: "state",
            minWidth: 50
        }
    ];
    const _renderItemColumn = (item: IIssue, index: number, column: IColumn) => {
        const iconButtonStyle: IButtonStyles = { root: { height: 16 } };
        switch (column.key) {
            case "icon":
                //return <FontIcon iconName="IssueTracking" />;
                return <IconButton iconProps={{ iconName: "IssueTracking" }} styles={iconButtonStyle} title={"Issue"} onClick={() => alert("test")} />;
            case "title":
                return <Link title={item.title} to={`/issueitem/${item.id}`}>{item.title}</Link>;
                break;
            case "state":
                return <span>{item.state}</span>;
            case "createdDate":
                return <span>{item.createdDate}</span>;
        }
    }
    const _onRenderDetailsHeader = (detailsHeaderProps: IDetailsHeaderProps): JSX.Element => {
        return (<DetailsHeader
            {...detailsHeaderProps}
            // indentWidth={0}
            // cellStyleProps={{ cellLeftPadding: 5, cellRightPadding: 0, cellExtraRightPadding: 0 }}
            ariaLabelForToggleAllGroupsButton={'Expand collapse groups'}
        />);
        //detailsHeaderProps.onToggleCollapseAll(true);
        // return (
        //     <DetailsRow
        //         {...detailsHeaderProps}
        //         columns={detailsHeaderProps.columns}
        //         item={{}}
        //         itemIndex={-1}
        //         indentWidth={0}
        //         cellStyleProps={{ cellLeftPadding: 5, cellRightPadding: 0, cellExtraRightPadding: 0 }}
        //         groupNestingDepth={detailsHeaderProps.groupNestingDepth}
        //         onRenderItemColumn={_renderDetailsHeaderItemColumn}
        //         onRenderCheck={_onRenderCheckForHeaderRow}
        //     />
        // );
    }
    const _renderDetailsHeaderItemColumn = (item: IIssue, index: number, column: IColumn) => {
        return (
            <div>
                <b>{column.name != "icon" ? column.name : ""}</b>
            </div>
        );
    }

    const _onRenderCheckForHeaderRow = (props: IDetailsRowCheckProps): JSX.Element => {
        return <DetailsRowCheck {...props} styles={{ root: { visibility: 'hidden' } }} selected={true} />;
    }
    return (
        <div className="ms-Grid">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                    <h2>{props.title}</h2>
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <ShimmeredDetailsList
                        indentWidth={0}
                        cellStyleProps={{ cellLeftPadding: 5, cellRightPadding: 0, cellExtraRightPadding: 0 }}
                        compact={true}
                        setKey="items"
                        items={items}
                        columns={columns}
                        groups={groups}
                        onRenderItemColumn={_renderItemColumn}
                        onRenderDetailsHeader={_onRenderDetailsHeader}
                        selectionMode={SelectionMode.none}
                        enableShimmer={isLoading}
                        ariaLabelForShimmer="Content is being fetched"
                        ariaLabelForGrid="Item details"
                    />

                </div>
            </div>
        </div>
    );
}
