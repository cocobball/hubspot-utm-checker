
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('extract').addEventListener('click', function() {
    chrome.tabs.executeScript({
      code: `
      var links = Array.from(document.querySelectorAll('a'));
      var linkedInLinks = links.filter(link => link.href.includes('linkedin'))
                                .map(link => link.href);
      
      // New code to count specific UTMs: "google_jobs_apply" and "HubSpot"
      var googleJobsApplyCount = 0;
      var hubSpotCount = 0;

      links.forEach(link => {
        if (link.href.includes('utm_source=google_jobs_apply')) {
          googleJobsApplyCount++;
        }
        if (link.href.includes('utm_source=HubSpot')) {
          hubSpotCount++;
        }
      });

      [linkedInLinks, googleJobsApplyCount, hubSpotCount];
      `
    }, function(result) {
      // Get the specific UTM counts
      const googleJobsApplyCount = result[0][1];
      const hubSpotCount = result[0][2];

      // Count the number of extracted LinkedIn links
      const numLinkedInLinks = result[0][0].length;

      // Format the LinkedIn links so each is on a new line
      const formattedLinkedInLinks = result[0][0].join('\n');

      // Display the counts at the top and the links in an alert popup
      alert("Google Jobs Apply Links: " + googleJobsApplyCount + "\n\nHubSpot Links: " + hubSpotCount + "\n\nTotal LinkedIn Links: " + numLinkedInLinks + "\n\n" + formattedLinkedInLinks);
    });
  });
});
