export const createGradient =
	(gradientOptions: { [s: string]: string }) =>
	(ctx: CanvasRenderingContext2D) => {
		const { height } = ctx.canvas;
		const canvasGradient = ctx.createLinearGradient(0, 0, 0, height);

		Object.entries(gradientOptions).forEach(([key, value]) => {
			const offset = key as unknown as number;
			const color = value as string;

			canvasGradient.addColorStop(offset, color);
		});

		return canvasGradient;
	};
