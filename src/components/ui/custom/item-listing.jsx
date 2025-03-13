import PropTypes from "prop-types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../table";

const ItemListing = ({
  listColumns,
  listData,
  showColumnHeading,
  actionElements,
  actionRender,
  onActionElementClick,
  onListItemClick,
  onSelect,
  sortConfig,
  showSelect,
  className,
}) => {
  const [sortedKey, sortedOrder] = sortConfig || [];

  const toggleSortOrder = (currentOrder) => (currentOrder === "1" ? "-1" : "1");
  const allSelected = listData.reduce(
    (acc, row) => acc && row.rowData?.select,
    true
  );

  const renderActionElements = (row) => {
    const elements = actionElements(row);
    const visibleElements = elements.filter((el) => el.visible !== false);
    const nonCollapsed = visibleElements.filter((el) => !el.collapse);
    const collapsed = visibleElements.filter((el) => el.collapse);

    return (
      <div className="flex items-center justify-end gap-2">
        {nonCollapsed.map((el) => (
          <Button
            key={el.id}
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onActionElementClick(el.id, row);
            }}
            disabled={el.disabled}
          >
            <i className={el.icon} />
          </Button>
        ))}
        {collapsed.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {collapsed.map((el) => (
                <DropdownMenuItem
                  key={el.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onActionElementClick(el.id, row);
                  }}
                >
                  {el.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    );
  };

  return (
    <Table className={className}>
      <TableHeader>
        {showColumnHeading && (
          <TableRow>
            {showSelect && (
              <TableCell>
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={(checked) => onSelect(checked, "")}
                  className="mr-4"
                />
              </TableCell>
            )}
            {listColumns.map((col, index) => (
              <TableCell
                key={index}
                className={`font-medium ${col.layout} text-[#000]`}
                onClick={() =>
                  col.sortKey &&
                  onSelect(col.sortKey, toggleSortOrder(sortedOrder))
                }
              >
                {col.title}&nbsp;
                {col.sortKey && col.sortKey === sortedKey ? (
                  <span className="">
                    <i
                      className={
                        sortedOrder === "-1" ? "icon-sort-up" : "icon-sort-down"
                      }
                    />
                  </span>
                ) : null}
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableHeader>
      <TableBody>
        {listData.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            className="cursor-pointer"
            onClick={() => onListItemClick(row, rowIndex)}
          >
            {showSelect && (
              <TableCell>
                <Checkbox
                  checked={row.rowData?.select}
                  onCheckedChange={(checked) => onSelect(checked, row)}
                  className="mr-4"
                />
              </TableCell>
            )}

            {row.columns.map((col, colIndex) => (
              <TableCell key={colIndex}>
                {col.type === "text" ? (
                  <div className="flex items-center gap-1">
                    {col.icon && col.icon}
                    {actionRender(row, col)}
                    {col.title}
                  </div>
                ) : col.type === "c2a" ? (
                  renderActionElements(row)
                ) : null}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

ItemListing.defaultProps = {
  listHeading: "",
  listColumns: [],
  listData: [],
  showColumnHeading: false,
  onListItemClick: () => {},
  onActionElementClick: () => {},
  actionElements: () => [],
  actionRender: () => {},
  onSelect: () => {},
  sortConfig: [],
  showSelect: false,
  bottomSpacing: "0",
};

ItemListing.propTypes = {
  listHeading: PropTypes.string,
  listColumns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      layout: PropTypes.string,
      sortKey: PropTypes.string,
    })
  ),
  listData: PropTypes.array,
  showColumnHeading: PropTypes.bool,
  actionElements: PropTypes.func,
  actionRender: PropTypes.func,
  onActionElementClick: PropTypes.func,
  onListItemClick: PropTypes.func,
  onSelect: PropTypes.func,
  sortConfig: PropTypes.array,
  showSelect: PropTypes.bool,
  bottomSpacing: PropTypes.string,
};

export default ItemListing;
