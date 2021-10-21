<script>
export default {
  data() {
    return {};
  },
  render() {
    const {$route: {path},} = this;
    if (path === "") {
      return "404";
    }
    const height = document.documentElement.clientHeight - 94.5 + "px";
    const style = {height: height};

    return (
        <div style={style}>
          <iframe
              src={path}
              frameborder="no"
              style="width: 100%; height: 100%"
              scrolling="auto"
          ></iframe>
        </div>
    );
  },
};
</script>
