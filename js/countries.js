<script type="text/javascript">	

	function configureDropDownLists(ddl1,ddl2) {
		var Countries = ['Colombia', 'Chile', 'Venezuela', 'Argentina'];
		var Cities = ['Caracas', 'Santiago', 'Bogotá', 'Buenos Aires'];

		switch (ddl1.value) {
			case 'Countries':
				ddl2.options.length = 0;
				for (i = 0; i < Countries.length; i++) {
					createOption(ddl2, Countries[i], Countries[i]);
				}
				break;
			case 'Cities':
				ddl2.options.length = 0; 
			for (i = 0; i < Cities.length; i++) {
				createOption(ddl2, Cities[i], Cities[i]);
				}
				break;
				default:
					ddl2.options.length = 0;
				break;
		}

}

    function createOption(ddl, text, value) {
        var opt = document.createElement('option');
        opt.value = value;
        opt.text = text;
        ddl.options.add(opt);
    }
</script>