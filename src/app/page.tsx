import CategoriesComponent from "@/components/ui/CategoriesComponent";
import HomeComponent from "@/components/ui/HomeComponent";
import NewCollectionComponent from "@/components/ui/NewCollectionCompo";
import SpecialWearComponent from "@/components/ui/SpecialWearComponent";

export default function Home() {
  return (
    <>
    <HomeComponent />
    <NewCollectionComponent />
    <SpecialWearComponent />
    <CategoriesComponent />
    </>
  );
}
