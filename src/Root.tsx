import {Composition} from 'remotion';
import {Overlay2, myCompSchema2} from './overlay2';
import {Overlay_red, myCompSchema_red} from './Overlay_red';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="DefaultOverlay"
				component={Overlay2}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				schema={myCompSchema2}
				defaultProps={{
					titleText: 'Join the closed alpha now!',
					subText: 'Link is in the description!',
				}}
			/>
			<Composition
				id="NDAOverlay"
				component={Overlay_red}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				schema={myCompSchema_red}
				defaultProps={{
					titleText: 'Remember there is still ',
					subText: 'an active NDA',
				}}
			/>
		</>
	);
};
