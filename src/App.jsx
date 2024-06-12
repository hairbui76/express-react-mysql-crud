import { Button, Flex, Skeleton, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ImageModal from "./ImageModal";
import OpenImageModal from "./OpenImageModal";
import { DeleteFilled, EyeFilled } from "@ant-design/icons";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ImageView from "./ImageView";

const fetchAllFiles = () =>
	fetch(`${import.meta.env.VITE_API_ENDPOINT}/files`).then(async (response) => {
		if (!response.ok) {
			const { message } = await response.json();
			throw new Error(message);
		}
		return response.json();
	});

const _App = () => {
	const [files, setFiles] = useState([]);
	const [open, setOpen] = useState(false);
	const [openImage, setOpenImage] = useState(false);
	const [selectId, setSelectId] = useState(null);
	const [refresh, setRefresh] = useState(false);
	const { isPending, data } = useQuery({
		queryKey: ["files", refresh],
		queryFn: fetchAllFiles,
	});

	useEffect(() => {
		if (data) setFiles(data);
	}, [data]);

	if (isPending) return <Skeleton />;

	const columns = [
		{
			title: "Id",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Download Url",
			dataIndex: "url",
			key: "url",
			render: (url, record) => {
				return (
					<Flex justify="space-between">
						<span>{url}</span>
						<Button type="primary" href={record.realUrl}>
							Download
						</Button>
					</Flex>
				);
			},
		},
		{
			title: "View",
			render: (_, record) => {
				return (
					<Flex gap={10}>
						<Link to={`/${record.id}`}>
							<Button
								icon={<EyeFilled />}
								type="primary"
								onClick={() => {
									setSelectId(record.id);
								}}
							/>
						</Link>
						<Button
							icon={<DeleteFilled />}
							onClick={async () => {
								await fetch(
									`${import.meta.env.VITE_API_ENDPOINT}/file/${record.id}/del`
								);
								window.location.reload();
							}}
							type="primary"
							danger
						/>
					</Flex>
				);
			},
		},
	];

	return (
		<>
			<ImageModal
				isOpen={open}
				setIsOpen={setOpen}
				setRefresh={setRefresh}
				refresh={refresh}
			/>
			<OpenImageModal
				openImage={openImage}
				setOpenImage={setOpenImage}
				selectId={selectId}
			/>
			<Space direction="vertical" style={{ padding: 20, width: "100%" }}>
				<Button onClick={() => setOpen(true)}>Upload new image</Button>
				<Table
					columns={columns}
					dataSource={files.map((file) => ({ ...file, key: file.id }))}
				/>
			</Space>
		</>
	);
};

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<_App />} />
				<Route path="/:id" element={<ImageView />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
