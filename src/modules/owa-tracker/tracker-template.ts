export const owaTrackerTemplate = `
<!-- Start -OWA_NAME- Footprint Analytics -->
<script type="text/javascript">
//<![CDATA[
var owa_baseUrl = '{OWA_BASE_URL}';
var owa_cmds = owa_cmds || [];
owa_cmds.push(['setSiteId', '{OWA_SITE_ID}']);
owa_cmds.push(['trackPageView']);
owa_cmds.push(['trackClicks']);

(function() {
    var _owa = document.createElement('script'); _owa.type = 'text/javascript'; _owa.async = true;
    owa_baseUrl = ('https:' == document.location.protocol ? window.owa_baseSecUrl || owa_baseUrl.replace(/http:/, 'https:') : owa_baseUrl );
    _owa.src = owa_baseUrl + 'modules/base/dist/owa.tracker.js';
    var _owa_s = document.getElementsByTagName('script')[0]; _owa_s.parentNode.insertBefore(_owa, _owa_s);
}());
//]]>
</script>
<!-- End -OWA_NAME- Footprint Analytics Code -->
`;
