import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { PostCode } from "./PostCodeModel";

interface PostCodeTableProps {
    postCodes: PostCode[]
}

export function PostCodeTable({postCodes}: PostCodeTableProps) {
    return (
        <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Post / Zip Code
                            </TableCell>
                            <TableCell>
                                City
                            </TableCell>
                            <TableCell>
                                Province / State
                            </TableCell>
                            <TableCell>
                                Country
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {postCodes.reverse().map((postCode) => (
                            <TableRow key={postCode.postCode} >
                                <TableCell> {postCode.postCode} </TableCell>
                                <TableCell> {postCode.places[0].name} </TableCell>
                                <TableCell >{postCode.places[0].state}</TableCell>
                                <TableCell >{postCode.country}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    )
}