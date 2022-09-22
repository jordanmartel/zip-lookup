import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_POSTCODE_QUERY } from "../gql/queries";
import { PostCode } from "./PostCodeModel";
import { PostCodeTable } from "./PostCodeTable";

interface PostCodeDisplayProps {
    postCode: string
    countryCode: string
}

export function PostCodeDisplay({ postCode, countryCode }: PostCodeDisplayProps) {

    const [postCodes, setPostCodes] = useState(Array());

    const { loading, error, data } = useQuery(GET_POSTCODE_QUERY, { variables: { postCode, countryCode }, skip: !postCode || !countryCode });

    // only update the list if data has changed
    useEffect(() => {
        if (data) {
            const postCode: PostCode = data.postcode;
            const newPostCodes = postCodes.slice();
            newPostCodes.push(postCode)
            if (newPostCodes.length > 5) {
                newPostCodes.shift();
            }
            setPostCodes(newPostCodes);
        }
    }, [data]);

    if (!postCode || !countryCode) {
        return null
    }
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Invalid postal code</p>;

    return (
        <PostCodeTable postCodes={postCodes}/>
    )

}