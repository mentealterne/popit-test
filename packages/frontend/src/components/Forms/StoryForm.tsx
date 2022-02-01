import { FunctionComponent, useEffect, useState } from "react";
import Select from "react-select";
import CRUD from "../../hooks/CRUD";
import { Campaign } from "../../types/campaign.type";
import { Story } from "../../types/story.type";

interface IProps {
  onSubmit: (values: Story) => void;
  onDelete?: (id: number) => void;
  story?: Story;
}
const StoryForm: FunctionComponent<IProps> = ({
  onSubmit,
  story,
  onDelete,
}) => {
  const [igId, setIgId] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [clicks, setClicks] = useState<number>(0);
  const [swipes, setSwipes] = useState<number>(0);
  const [views, setViews] = useState<number>(0);
  const [selectedCampaign, setSelectedCampaign] = useState<
    { label: string; value: string } | undefined
  >();
  const [campaigns, setCampaigns] = useState<Campaign[]>();

  const campaignCRUD = new CRUD(process.env.REACT_APP_API_URL + "/campaigns/");

  const fetchCampaigns = async () => {
    const campaignsRef = await campaignCRUD.readAll();

    setCampaigns(campaignsRef);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);
  useEffect(() => {
    if (story) {
      setId(story.id!);
      setIgId(story.ig_id);
      setClicks(story.clicks);
      setSwipes(story.swipes);
      setViews(story.views);
      setSelectedCampaign({
        label: story.campaign!.company,
        value: story.campaign!.id.toString(),
      });
    }
  }, [story]);

  if (story) {
    if (!selectedCampaign) return <p>Loading...</p>;
  }

  return (
    <form className="flex flex-col gap-4">
      <input
        defaultValue={igId}
        type="text"
        onChange={(e) => setIgId(e.target.value)}
        className="p-2 border border-gray-400 rounded-md"
        placeholder="Instagram username"
      />
      <input
        type="number"
        placeholder="Clicks"
        min={0}
        value={clicks}
        onChange={(e) => setClicks(parseInt(e.target.value))}
        className="p-2 border border-gray-400 rounded-md"
      />
      <input
        type="number"
        placeholder="Swipes"
        min={0}
        value={swipes}
        onChange={(e) => setSwipes(parseInt(e.target.value))}
        className="p-2 border border-gray-400 rounded-md"
      />
      <input
        type="number"
        placeholder="views"
        min={0}
        value={views}
        onChange={(e) => setViews(parseInt(e.target.value))}
        className="p-2 border border-gray-400 rounded-md"
      />

      <Select
        options={campaigns?.map(
          (c: any) => ({ label: c.company, value: c.id } as any)
        )}
        defaultValue={selectedCampaign}
        onChange={(value) => setSelectedCampaign(value!)}
      />

      <button
        type="button"
        onClick={() =>
          onSubmit({
            ig_id: igId,
            clicks,
            swipes,
            views,
            campaignId: selectedCampaign?.value as unknown as number,
          })
        }
        className="px-4 py-2 text-white text-center font-bold bg-orange-500 hover:bg-orange-700"
      >
        {(story ? "Edit" : "Create") + " story"}
      </button>
      {onDelete && story && (
        <button
          type="button"
          onClick={() => onDelete(story.id!)}
          className="px-4 py-2 text-white text-center font-bold bg-red-500 hover:bg-orange-700"
        >
          Delete Story
        </button>
      )}
    </form>
  );
};

export default StoryForm;
