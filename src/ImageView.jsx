import { Button, Flex } from "antd";
import { Link, useParams } from "react-router-dom";

export default function ImageView() {
	const { id } = useParams();
	return (
		<Flex style={{ padding: 20 }} gap={20}>
			<Link to="/">
				<Button type="primary">Back</Button>
			</Link>
			<img
				src={`${import.meta.env.VITE_API_ENDPOINT}/file/${id}`}
				style={{ objectFit: "contain", border: "1px solid black" }}
				width={500}
				height={500}
			/>
		</Flex>
	);
}
