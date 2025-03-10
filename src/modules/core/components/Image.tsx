import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getImage } from "@/supabase/supabase";
import { useQuery } from "@tanstack/react-query";

export default function Image({
  queryKey,
  file,
  alt,
}: ImageProps) {
  const { path: image, id } = file

  const { data, isLoading } = useQuery({
    queryKey: [queryKey, 'image', id],
    queryFn: () => {
      return getImage(image);
    },
  })


  console.log('Image data:', data);

  if (isLoading) {
    return (
      <>
        Loading...
      </>
    )
  }



  return (
    <AspectRatio ratio={4 / 3}>
      <img src={data.publicUrl} alt="Image" className="h-full"/>

  return (
    <AspectRatio ratio={4 / 3} className="relative">
      <img src={data?.publicUrl} alt="Image"  className="object-cover h-full w-full"/>

    </AspectRatio>
  )
}
