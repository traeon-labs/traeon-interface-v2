import {Iconify} from "@/components/iconify";
import {shortenAddress} from "@/utils";
import {Chip,Link} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Typography} from "@telegram-apps/telegram-ui";

function createData(
  hash: string,
  from: string,
  to: string,
  value: number,
  NFT: string,
  ts: number
) {
  return { hash, from, to, value, NFT, ts };
}
const rows = [
  createData(
    "707d5acf5847b660c82fb0d86ec1ccf2ca69b42384e6cfac0250963dfb435aaa",
    "EQAwbPGaCGCwLstAeRQvNMWaYC2r-83uEi6jGRcVIxS8sQz4",
    "UQAErTNLiPayvToi4PWAim71mGXiP-p9ma0qRz2evXS3Yatu",
    1.77,
    "#2151261261",
    Date.now() - 10000
  ),
  createData(
    "ca93f681a258dc3d6eaf910cace975812cf000f449e8e1d1e7a5296ccfaf440c",
    "UQAErTNLiPayvToi4PWAim71mGXiP-p9ma0qRz2evXS3Yatu",
    "UQAErTNLiPayvToi4PWAim71mGXiP-p9ma0qRz2evXS3Yatu",
    43.73,
    "#21261261",
    Date.now() - 8000
  ),
  createData(
    "707d5acf5847b660c82fb0d86ec1ccf2ca69b42384e6cfac0250963dfb435aaa",
    "UQC5mQvHqNHaAq2e_OCpir0zeTCAqRaWhv4hQWo6bO9w0HKi",
    "UQAErTNLiPayvToi4PWAim71mGXiP-p9ma0qRz2evXS3Yatu",
    7.37,
    "#5751261261",
    Date.now() - 410000
  ),
  createData(
    "3d7a0f6c929b8b57c3963eb1bc1072328fbef2d7868c5cd89d71ea78c1aa4f3d",
    "UQC5mQvHqNHaAq2e_OCpir0zeTCAqRaWhv4hQWo6bO9w0HKi",
    "UQAErTNLiPayvToi4PWAim71mGXiP-p9ma0qRz2evXS3Yatu",
    16.04,
    "#45151261261",
    Date.now() - 5810000
  ),
  createData(
    "707d5acf5847b660c82fb0d86ec1ccf2ca69b42384e6cfac0250963dfb435aaa",
    "EQAwbPGaCGCwLstAeRQvNMWaYC2r-83uEi6jGRcVIxS8sQz4",
    "UQAErTNLiPayvToi4PWAim71mGXiP-p9ma0qRz2evXS3Yatu",
    3.78,
    "#934151261261",
    Date.now() - 840000
  ),
];

export default function AssetHistory() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Hash</TableCell>
            <TableCell align="left">NFT</TableCell>
            <TableCell align="left">
              <Chip
                sx={{ background: "none" }}
                size="small"
                icon={<Iconify icon="token:ton" />}
                label="Value"
              />
            </TableCell>
            <TableCell align="left">From</TableCell>
            <TableCell align="left">To</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, _) => (
            <TableRow
              key={_}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link href={`https://tonscan.org/tx/${row.hash}`}>{shortenAddress(row.hash,3,3)}</Link>
              </TableCell>
              <TableCell align="left">
              <Chip
                  style={{
                    textAlign: "center",
                    marginTop: "0.4rem",
                    padding: "0.5rem",
                  }}
                  variant="outlined"
                  color="default"
                  icon={<Iconify icon="mingcute:hashtag-fill" />}
                  label={
                    (<Typography Component={"h5"}>
                      {row.NFT.split("#")[1]}
                    </Typography>)
                  }
                  onClick={() => {
                    navigator.clipboard.writeText(row.NFT);
                  }}
                />
              </TableCell>
              <TableCell align="left">{row.value}</TableCell>
              <TableCell align="left">{shortenAddress(row.from,3,3)}</TableCell>
              <TableCell align="left">{shortenAddress(row.to)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
