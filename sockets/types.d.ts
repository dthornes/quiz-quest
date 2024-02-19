import { IPlayer } from "@/lib/database/models/player.model";
import { PlayerQuizQuestion } from "@/types";

export interface ServerToClientEvents {
	// HOST
	host_screen: (data: string) => void;
	game_pin: (data: string) => void;
	players: (data: string[]) => void;
	quiz_question: (data: PlayerQuizQuestion) => void;

	// PLAYER
	player_list: (data: string) => void;
	start_quiz: (data: boolean) => void;
}

export interface ClientToServerEvents {
	// BOTH
	join_room: (data: { quizId: string }) => void;

	// HOST
	host_screen: (data: { quizId: string }) => void;
	game_pin: (data: { quizId: string }) => void;
	players: (data: { quizId: string }) => void;
	start_quiz: (data: { quizId: string }) => void;
	quiz_question: (data: { quizId: string }) => void;

	// PLAYER
	add_player: (data: { quizId: string; player: IPlayer }) => void;

	reset_quiz: (data: { quizId: string }) => void;
	get_question: (data: { quizId: string; activeQuestion: number }) => void;
	answer_question: (data: { quizId: string }) => void;
}
