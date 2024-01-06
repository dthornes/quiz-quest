"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { quizFormSchema } from "@/lib/validator";
import * as z from "zod";
import { quizDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";

import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { createQuiz, updateQuiz } from "@/lib/actions/quiz.actions";
import { IQuiz } from "@/lib/database/models/quiz.model";
import QuizQuestions from "./QuizQuestions";

type QuizFormProps = {
	userId: string;
	type: "Create" | "Update";
	quiz?: IQuiz;
	quizId?: string;
};

const QuizForm = ({ userId, type, quiz, quizId }: QuizFormProps) => {
	const [files, setFiles] = useState<File[]>([]);
	const initialValues = quizDefaultValues;
	const router = useRouter();

	const { startUpload } = useUploadThing("imageUploader");

	const form = useForm<z.infer<typeof quizFormSchema>>({
		resolver: zodResolver(quizFormSchema),
		defaultValues: initialValues,
	});

	async function onSubmit(values: z.infer<typeof quizFormSchema>) {
		let uploadedImageUrl = values.imageUrl;

		if (files.length > 0) {
			const uploadedImages = await startUpload(files);

			if (!uploadedImages) {
				return;
			}

			uploadedImageUrl = uploadedImages[0].url;
		}

		if (type === "Create") {
			try {
				const newQuiz = await createQuiz({
					quiz: { ...values, imageUrl: uploadedImageUrl },
					userId,
					path: "/profile",
				});

				if (newQuiz) {
					form.reset();
					router.push(`/quiz/${newQuiz._id}`);
				}
			} catch (error) {
				console.log(error);
			}
		}

		if (type === "Update") {
			if (!quizId) {
				router.back();
				return;
			}

			try {
				const updatedQuiz = await updateQuiz({
					userId,
					quiz: { ...values, imageUrl: uploadedImageUrl, _id: quizId },
					path: `/quiz/${quizId}`,
				});

				if (updatedQuiz) {
					form.reset();
					router.push(`/quiz/${updatedQuiz._id}`);
				}
			} catch (error) {
				console.log(error);
			}
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-5"
			>
				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Input
										placeholder="Title"
										{...field}
										className="input-field"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="categoryId"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Dropdown
										onChangeHandler={field.onChange}
										value={field.value}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl className="h-72">
									<Textarea
										placeholder="Description"
										{...field}
										className="textarea rounded-2xl"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="imageUrl"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl className="h-72">
									<FileUploader
										onFieldChange={field.onChange}
										imageUrl={field.value}
										setFiles={setFiles}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<QuizQuestions form={form} />

				<Button
					type="submit"
					size="lg"
					disabled={form.formState.isSubmitting}
					className="button col-span-2 w-full"
				>
					{form.formState.isSubmitting ? "Submitting..." : `${type} Quiz `}
				</Button>
			</form>
		</Form>
	);
};

export default QuizForm;
