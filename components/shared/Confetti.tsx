"use client";

import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

const Confetti = () => {
	const [init, setInit] = useState(false);

	useEffect(() => {
		initParticlesEngine(async (engine) => {
			await loadConfettiPreset(engine);
		}).then(() => {
			setInit(true);
		});
	}, []);

	return (
		init && (
			<Particles
				id="tsparticles"
				options={{
					fpsLimit: 60,
					fullScreen: {
						enable: true,
					},
					preset: "confetti",
					particles: {
						color: {
							value: ["#3b82f6", "#ef4444", "#facc15", "#22c55e"], // blue, red, yellow, green
						},
						shape: {
							type: ["square"],
						},
						opacity: {
							value: { min: 0, max: 1 },
							animation: {
								enable: true,
								speed: 2,
								startValue: "max",
								destroy: "min",
							},
						},
						size: {
							value: { min: 7, max: 16 },
						},
						life: {
							duration: {
								sync: true,
								value: 5,
							},
							count: 1,
						},
						move: {
							enable: true,
							gravity: {
								enable: true,
								acceleration: 20,
							},
							speed: 80,
							decay: 0.1,
							direction: "none",
							random: false,
							straight: false,
							outModes: {
								default: "destroy",
								top: "none",
							},
						},
						rotate: {
							value: {
								min: 0,
								max: 360,
							},
							direction: "random",
							move: true,
							animation: {
								enable: true,
								speed: 60,
							},
						},
						tilt: {
							direction: "random",
							enable: true,
							move: true,
							value: {
								min: 0,
								max: 360,
							},
							animation: {
								enable: true,
								speed: 60,
							},
						},
						roll: {
							darken: {
								enable: true,
								value: 25,
							},
							enable: true,
							speed: {
								min: 15,
								max: 25,
							},
						},
						wobble: {
							distance: 30,
							enable: true,
							move: true,
							speed: {
								min: -15,
								max: 15,
							},
						},
					},
					emitters: [
						{
							direction: "top-right",
							rate: {
								delay: 0.1,
								quantity: 3,
							},
							position: {
								x: 0,
								y: 100,
							},
							size: {
								width: 0,
								height: 0,
							},
							particles: {
								move: {
									angle: {
										offset: -15,
										value: 60,
									},
								},
							},
						},
						{
							direction: "top-left",
							rate: {
								delay: 0.1,
								quantity: 5,
							},
							position: {
								x: 100,
								y: 100,
							},
							size: {
								width: 0,
								height: 0,
							},
							particles: {
								move: {
									angle: {
										offset: 15,
										value: 60,
									},
								},
							},
						},
					],
				}}
			/>
		)
	);
};

export default Confetti;
