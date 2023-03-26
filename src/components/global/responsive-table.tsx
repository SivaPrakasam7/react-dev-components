import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import { StackLabel } from "./stack-label";
import { useUtils } from "../../hooks/utils/use-utils";

export const ResponsiveTable = ({
  titles,
  data,
  size,
  rowPerPage = 10,
  count,
  pageNo,
  setPageNo,
  fileName,
  isMobile = false,
  minHeight,
  enableCSVexport = false,
  enablePDFexport = false,
}: responsiveTable.Props & Pick<Mui.TableProps, "size">) => {
  const { downloadPDF, toCSVFile } = useUtils();
  const [page, setPage] = React.useState(1);
  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    if (setPageNo) setPageNo(value);
    else setPage(value);
  };
  React.useEffect(() => {
    setPage(1);
  }, [data.length]);

  return (
    <>
      <Mui.Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="flex-end"
        sx={{
          mb: 1,
          display: enableCSVexport || enablePDFexport ? "flex" : "none",
        }}
      >
        <Mui.Typography variant="body1" fontWeight={900}>
          Export:
        </Mui.Typography>
        <Mui.Tooltip title="Export as a CSV file">
          <Mui.IconButton
            size="small"
            color="secondary"
            component="a"
            download={`${fileName}.csv`}
            href={toCSVFile(titles.toString(), data)}
            sx={{
              width: "fit-content",
              border: (theme) => `1px solid ${theme.palette.secondary.main}`,
              borderWidth: 1,
              display: enableCSVexport ? "flex" : "none",
            }}
          >
            <MuiIcons.InsertDriveFile />
          </Mui.IconButton>
        </Mui.Tooltip>
        <Mui.Tooltip title="Export as a PDF file">
          <Mui.IconButton
            size="small"
            color="secondary"
            onClick={() => fileName && downloadPDF(fileName)}
            sx={{
              width: "fit-content",
              border: (theme) => `1px solid ${theme.palette.secondary.main}`,
              display: enablePDFexport ? "flex" : "none",
            }}
          >
            <MuiIcons.PictureAsPdf />
          </Mui.IconButton>
        </Mui.Tooltip>
      </Mui.Stack>
      <Mui.TableContainer
        sx={{
          borderRadius: 3,
          display: isMobile ? "none" : { xs: "none", md: "block" },
          minHeight,
        }}
      >
        <Mui.Table size={size}>
          <Mui.TableHead
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === "light"
                  ? `${theme.palette.primary.main}40`
                  : "background.default",
              borderColor: (theme) => `${theme.palette.primary.main}40`,
            }}
          >
            {titles.map((title, index) => (
              <Mui.TableCell key={index}>
                <Mui.Typography noWrap variant="body2" color="text.secondary">
                  {title}
                </Mui.Typography>
              </Mui.TableCell>
            ))}
          </Mui.TableHead>
          <Mui.TableBody>
            {data?.length ? (
              data
                ?.slice(
                  count ? 0 : rowPerPage * page - rowPerPage,
                  count ? undefined : rowPerPage * page
                )
                ?.map((values, index) => <TableData key={index} {...values} />)
            ) : (
              <Mui.TableRow>
                <Mui.TableCell colSpan={titles?.length}>
                  <Mui.Typography
                    variant="h5"
                    textAlign="center"
                    sx={{
                      p: 5,
                      color: Mui.colors.grey[300],
                    }}
                  >
                    No Record Found
                  </Mui.Typography>
                </Mui.TableCell>
              </Mui.TableRow>
            )}
          </Mui.TableBody>
        </Mui.Table>
        <Mui.Table
          size={size}
          id={fileName?.toLowerCase()}
          sx={{ display: "none" }}
        >
          <Mui.TableRow
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === "light"
                  ? `${theme.palette.primary.main}40`
                  : "background.default",
              borderColor: (theme) => `${theme.palette.primary.main}40`,
            }}
          >
            {titles.map((title, index) => (
              <Mui.TableCell key={index}>
                <Mui.Typography noWrap variant="body2" color="text.secondary">
                  {title}
                </Mui.Typography>
              </Mui.TableCell>
            ))}
          </Mui.TableRow>
          <Mui.TableBody>
            {data?.length ? (
              data?.map((values, index) => (
                <TableData key={index} {...values} />
              ))
            ) : (
              <Mui.TableRow>
                <Mui.TableCell colSpan={titles?.length}>
                  <Mui.Typography
                    variant="h5"
                    textAlign="center"
                    sx={{
                      p: 5,
                      color: Mui.colors.grey[300],
                    }}
                  >
                    No Record Found
                  </Mui.Typography>
                </Mui.TableCell>
              </Mui.TableRow>
            )}
          </Mui.TableBody>
        </Mui.Table>
      </Mui.TableContainer>
      {data?.length ? (
        data
          ?.slice(
            count ? 0 : rowPerPage * page - rowPerPage,
            count ? undefined : rowPerPage * page
          )
          ?.map((values, index) => (
            <CardView
              key={index}
              titles={titles}
              data={values}
              isMobile={isMobile}
            />
          ))
      ) : (
        <Mui.Typography
          variant="h5"
          textAlign="center"
          sx={{
            p: 5,
            display: { xs: "flex", md: "none" },
            color: Mui.colors.grey[300],
          }}
        >
          No Record Found
        </Mui.Typography>
      )}
      <Mui.Stack
        direction={{ xs: "column", sm: isMobile ? "column" : "row" }}
        alignItems="center"
        justifyContent="space-between"
        sx={{ m: 2, flexGrow: 1 }}
        spacing={2}
      >
        <Mui.Typography variant="body1">
          Total: {count || data.length}
        </Mui.Typography>
        <Mui.Pagination
          siblingCount={1}
          boundaryCount={1}
          variant="outlined"
          shape="rounded"
          color="primary"
          count={
            (count || data.length) <= rowPerPage
              ? 1
              : (count || data.length) % rowPerPage
              ? parseInt(((count || data.length) / rowPerPage).toString()) + 1
              : parseInt(((count || data.length) / rowPerPage).toString())
          }
          page={pageNo || page}
          onChange={handlePageChange}
        />
      </Mui.Stack>
    </>
  );
};

export const TableData = ({ node, ...props }: responsiveTable.Data) => {
  const { formatTimeString } = useUtils();
  const [open, close] = React.useState(false);
  return (
    <>
      <Mui.TableRow
        sx={{ borderColor: (theme) => theme.palette.grey[100] }}
        onClick={() => close(!open)}
      >
        {Object.entries(props).map(([key, value], index) => (
          <Mui.TableCell key={index}>
            <Mui.Typography variant="body2">
              {key === "date"
                ? formatTimeString(value as unknown as string)
                : value}
            </Mui.Typography>
          </Mui.TableCell>
        ))}
      </Mui.TableRow>
      {node && open && (
        <Mui.TableRow>
          <Mui.TableCell colSpan={Object.keys(props).length}>
            {node}
          </Mui.TableCell>
        </Mui.TableRow>
      )}
    </>
  );
};

const CardView = ({
  titles,
  data: { node, ...values },
  isMobile,
}: responsiveTable.CardProps) => {
  const [open, close] = React.useState(false);
  return (
    <Mui.Card
      sx={{
        borderRadius: "inherit",
        display: isMobile ? "block" : { xs: "block", md: "none" },
        border: (theme) => `1px solid ${theme.palette.grey[200]}`,
        // boxShadow: (theme) => {
        //   md: `0 0 5px ${theme.palette.grey[400]}`;
        // },
        my: 1,
      }}
    >
      <Mui.Grid
        component={Mui.CardContent}
        container
        spacing={2}
        sx={{
          display: isMobile ? "flex" : { xs: "flex", md: "none" },
        }}
        onClick={() => close(!open)}
      >
        {Object.entries(values).map(([key, value], i, a) => (
          <Mui.Grid
            key={i}
            item
            xs={a.length % 2 && a.length === i + 1 ? 12 : 6}
          >
            {key === "date" ? (
              <StackLabel
                medium
                title={titles[i]}
                label={value as string}
                time
              />
            ) : key === "action" ? (
              <Mui.Stack alignItems="center">{value}</Mui.Stack>
            ) : key === "coin" ? (
              <Mui.Typography variant="body1">{value}</Mui.Typography>
            ) : (
              <StackLabel medium title={titles[i]} label={value} node />
            )}
          </Mui.Grid>
        ))}
      </Mui.Grid>
      {node && open && node}
    </Mui.Card>
  );
};

export declare namespace responsiveTable {
  export interface Props {
    titles: string[];
    data: Data[];
    count?: number;
    pageNo?: number;
    setPageNo?: (number: number) => void;
    fileName?: string;
    isMobile?: boolean;
    rowPerPage?: number;
    minHeight?: number;
    enablePDFexport?: boolean;
    enableCSVexport?: boolean;
  }
  export interface CardProps {
    titles: string[];
    data: Data;
    isMobile?: boolean;
  }
  export interface Data {
    [key: string]: string | number | React.ReactNode;
  }
}
