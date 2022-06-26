export const createGradient =
	(gradientOptions: { [s: string]: string }) =>
	(ctx: CanvasRenderingContext2D) => {
		const { height } = ctx.canvas;
		const canvasGradient = ctx.createLinearGradient(0, 0, 0, height);

		Object.entries(gradientOptions).forEach(([offset, color]) => {
			canvasGradient.addColorStop(offset, color);
		});

		return canvasGradient;
	};
