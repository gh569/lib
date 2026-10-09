
import { useTagData } from "@utils/use-tag-data";
import ImageGallery from '@com/image-gallery'
const thisTab='images'

export default function(){
	const thisData = useTagData(thisTab, { transform: (data) => data.map(item => item.value) });
	
	return (<div>
		<ImageGallery images={thisData.value} />
	</div>)
}

