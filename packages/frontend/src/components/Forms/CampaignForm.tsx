import { FunctionComponent, useEffect, useState } from "react";

interface IProps {
  onSubmit: (values: { company: string; open: boolean }) => void;
  onDelete?: (id: number) => void;
  campaign?: { company: string; open: boolean; id: number };
}
const CampaignForm: FunctionComponent<IProps> = ({
  onSubmit,
  campaign,
  onDelete,
}) => {
  const [company, setCompany] = useState<string>("");
  const [id, setId] = useState<number>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (campaign) {
      setCompany(campaign.company);
      setOpen(campaign.open);
      setId(campaign.id);
    }
  }, [campaign]);

  return (
    <form className="flex flex-col gap-4">
      <input
        defaultValue={company}
        type="text"
        onChange={(e) => setCompany(e.target.value)}
        className="p-2 border border-gray-400 rounded-md"
        placeholder="Company"
      />
      <label className="flex flex-row gap-2 items-center">
        <input
          checked={open}
          type="checkbox"
          onClick={() => setOpen(!open)}
          className="p-2 border border-gray-400 rounded-md"
        />
        Open
      </label>
      <button
        type="button"
        onClick={() => onSubmit({ company, open })}
        className="px-4 py-2 text-white text-center font-bold bg-orange-500 hover:bg-orange-700"
      >
        {(campaign ? "Edit" : "Create") + " campaign"}
      </button>
      {onDelete && campaign && (
        <button
          type="button"
          onClick={() => onDelete(campaign.id)}
          className="px-4 py-2 text-white text-center font-bold bg-red-500 hover:bg-orange-700"
        >
          Delete campaign
        </button>
      )}
    </form>
  );
};

export default CampaignForm;
