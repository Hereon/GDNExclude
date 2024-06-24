function main() {
  var EXCLUSION_LIST_NAME = 'Plcement_exclude_list';

  var query = [
      "SELECT group_placement_view.placement, group_placement_view.placement_type, metrics.impressions, metrics.clicks, metrics.conversions " +
      "FROM group_placement_view " +
      "WHERE segments.date DURING LAST_7_DAYS AND group_placement_view.placement_type = 'WEBSITE' AND group_placement_view.target_url != 'youtube.com' AND metrics.conversions = 0 AND metrics.impressions > 3000 " + 
      "ORDER BY metrics.impressions DESC"
  ].join(' ');

  var rows = AdsApp.report(query).rows();
  var list = AdsApp.excludedPlacementLists().withCondition("shared_set.name = '"+EXCLUSION_LIST_NAME+"'").get().next();
  var placements = list.excludedPlacements().get();
  var pl = placements.next();
  var url = [];
  while(rows.hasNext()) {
    var row = rows.next();
     url.push(row['group_placement_view.placement']);
    }
  pl.getExcludedPlacementList().addExcludedPlacements(url);
}
