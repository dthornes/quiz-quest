export interface ServerToClientEvents {
	screen: (data: string) => void;
	player_list: (data: string) => void;
	start_quiz: () => void;
	set_question: (questionIndex: number) => void;
}

export interface ClientToServerEvents {
	add_player: (data: { quizId: string; name: string }) => void;
	confirm_players: (data: { quizId: string }) => void;
	reset_quiz: (data: { quizId: string }) => void;
	get_question: (data: { quizId: string; activeQuestion: number }) => void;
	answer_question: (data: { quizId: string }) => void;
}
