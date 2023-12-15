import {Composition, CalculateMetadataFunction} from 'remotion';
import {Overlay2, myCompSchema2, MyComponentPropsOverlay} from './overlay2';
import {Overlay_red, myCompSchema_red, MyComponentPropsOverlayRed} from './Overlay_red';
import {testComp, testSchema} from './testComp';

const calculateMetadataOverlay: CalculateMetadataFunction<MyComponentPropsOverlay> = ({
	props,
	defaultProps,
	abortSignal,
}) => {
	return {
		// Change the metadata
		durationInFrames: props.durationInSeconds * 30 + props.endDelayInSeconds * 30,
		// or transform some props
		props,
		// or add per-composition default codec
		defaultCodec: 'gif',
	};
};


const calculateMetadataOverlayRed: CalculateMetadataFunction<
	MyComponentPropsOverlayRed
> = ({props, defaultProps, abortSignal}) => {
	return {
		// Change the metadata
		durationInFrames:
			props.durationInSeconds * 30 + props.endDelayInSeconds * 30,

		// or transform some props
		props,
		// or add per-composition default codec
		defaultCodec: 'gif',
	};
};
export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="DefaultOverlay"
				component={Overlay2}
				fps={30}
				width={1920}
				height={1080}
				schema={myCompSchema2}
				calculateMetadata={calculateMetadataOverlay}
				defaultProps={{
					titleText: 'Join the closed alpha now!',
					subText: 'Link is in the description!',
					endDelayInSeconds: 30,
					durationInSeconds: 5,
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
				calculateMetadata={calculateMetadataOverlayRed}
				defaultProps={{
					titleText: 'Remember there is still ',
					subText: 'an active NDA',
					endDelayInSeconds: 30,
					durationInSeconds: 5,
				}}
			/>
			<Composition
				id="test"
				component={testComp}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				schema={testSchema}
				defaultProps={{disclaimerText: 'yeeea'}}
			/>
		</>
	);
};
