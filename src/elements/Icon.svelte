<script>
  export let name;
  export let label = "";
  export let color = "#000";
</script>

<style>
  span {
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: contain;
    width: 16px;
    height: 16px;
    display: block;
  }
</style>

<span
  aria-label={label}
  style={`-webkit-mask-image: url(./src/icons/${name}.svg); background-color: ${color}`} />
