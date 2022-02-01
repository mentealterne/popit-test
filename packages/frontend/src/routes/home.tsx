import { FunctionComponent, useEffect, useState } from "react";
import FilteredTable from "../components/FilteredTable";

const HomePage: FunctionComponent = () => {
  const [topInfluencers, setTopInfluencers] = useState([]);
  const [worstInfluencers, setWorstInfluencers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  const fetchInfluencersStats = async (
    k: number,
    type: string,
    cb: Function,
    campaignId?: number
  ) => {
    const request = await fetch(
      process.env.REACT_APP_API_URL +
        `/campaigns/top-k-influencers?k=${k}&type=${type}${
          campaignId ? "&campaignId=" + campaignId : ""
        }`
    );

    const response = await request.json();
    cb(response);
  };

  const fetchCampaigns = async () => {
    const request = await fetch(process.env.REACT_APP_API_URL + `/campaigns/`);
    const response = await request.json();
    setCampaigns(response);
  };

  useEffect(() => {
    fetchInfluencersStats(10, "top", setTopInfluencers);
    fetchInfluencersStats(10, "worst", setWorstInfluencers);
    fetchCampaigns();
  }, []);

  return (
    <div className=" grid grid-cols-2 gap-4 p-4">
      <FilteredTable
        onFilterChange={(campaignId) =>
          fetchInfluencersStats(10, "top", setTopInfluencers, campaignId)
        }
        name="Top 10 influencers"
        filterOptions={
          campaigns &&
          campaigns.map((campaign: any) => {
            return { label: campaign.company, value: campaign.id };
          })
        }
        columns={[
          { label: "Instagram Username", key: "ig_id" },
          { label: "Views", key: "views" },
        ]}
        data={topInfluencers}
      />

      <FilteredTable
        name="Worst 10 influencers"
        onFilterChange={(campaignId) =>
          fetchInfluencersStats(10, "worst", setWorstInfluencers, campaignId)
        }
        filterOptions={
          campaigns &&
          campaigns.map((campaign: any) => {
            return { label: campaign.company, value: campaign.id };
          })
        }
        columns={[
          { label: "Instagram Username", key: "ig_id" },
          { label: "Views", key: "views" },
        ]}
        data={worstInfluencers}
      />
    </div>
  );
};

export default HomePage;
