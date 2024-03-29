import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import VizSensor from "react-visibility-sensor";
import axios from "axios";
//Components
import Scream from "../components/Scream";
import Categories from "../components/Categories";
import Countries from "../components/Countries";
import NewsSkeleton from "../components/NewsSkeleton";
import ReadMore from "../components/ReadMore";
// mui stuff
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import withSyles from "@material-ui/core/styles/withStyles";

import countryArray from "../util/consts";
const gnewsapiproxy =
  "https://newsfeedxtra-api.netlify.app/.netlify/functions/server";
var networkDataReceived = false;
var countryCovered = false;
const categoriesArray = [
  {
    id: "general",
    sources:
      "abc-news,al-jazeera-english,associated-press,axios,bbc-news,cbc-news,cbs-news,cnn,fox-news,google-news,google-news-au,google-news-ca,google-news-in,google-news-uk,independent,nbc-news,news24,newsweek,reuters,the-huffington-post",
  },
  {
    id: "business",
    sources:
      "australian-financial-review,bloomberg,business-insider,business-insider-uk,cnbc,financial-post,the-wall-street-journal,fortune",
  },
  {
    id: "entertainment",
    sources:
      "buzzfeed,entertainment-weekly,ign,mashable,mtv-news,mtv-news-uk,polygon,the-lad-bible",
  },
  {
    id: "health",
    sources: "medical-news-today",
  },
  {
    id: "sports",
    sources:
      "bbc-sport,bleacher-report,espn,espn-cric-info,football-italia,four-four-two,fox-sports,nfl-news,nhl-news,talksport,the-sport-bible",
  },
  {
    id: "science",
    sources: "national-geographic,new-scientist,next-big-future",
  },
  {
    id: "technology",
    sources:
      "ars-technica,crypto-coins-news,engadget,hacker-news,recode,techcrunch,techradar,the-next-web,the-verge,wired",
  },
];

const styles = (theme) => ({
  alert: {
    fontFamily: "Playfair Display",
    width: "100%",
    textAlign: "center",
  },
  button: {
    textAlign: "center",
    width: "100%",
    margin: "auto",
  },
  buttonProgress: {
    position: "relative",
    textAlign: "center",
    width: "100%",
    margin: "auto",
    left: "45%",
  },
  muiIcons: {
    position: "relative",
    top: "13px",
    [theme.breakpoints.only("xs")]: {
      top: "10px",
    },
    [theme.breakpoints.only("sm")]: {
      top: "10px",
    },
    "&.MuiSvgIcon-root": {
      height: "2em",
      width: "2em",
      [theme.breakpoints.only("xs")]: {
        height: "1.5em",
        width: "1.5em",
      },
      [theme.breakpoints.only("sm")]: {
        height: "1.5em",
        width: "1.5em",
      },
    },
  },
  titleheader: {
    color: "#f4976c",
    fontColor: "#f4976c",
    [theme.breakpoints.only("xs")]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "1.5rem",
    },
  },
});

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreLoading: false,
      loading: true,
      error: false,
      loadedCategory: "none",
      theError: "",
      countryNews: [],
      news: [],
      myCountry: localStorage.myCountry,
      newsActive: true,
      generalActive: true,
      entertainmentActive: false,
      businessActive: false,
      healthActive: false,
      scienceActive: false,
      sportsActive: false,
      businessViz: false,
      generalViz: true,
      entertainmentViz: false,
      healthViz: false,
      sportsViz: false,
      scienceViz: false,
      technologyViz: false,
      business: [],
      entertainment: [],
      general: [],
      health: [],
      science: [],
      sports: [],
      technology: [],
    };
  }

  fetchOnline = () => {
    return axios
      .get(
        `${gnewsapiproxy}/topheadlines/''/''/'abc-news,al-jazeera-english,bbc-news,bleacher-report,bloomberg,business-insider,cbc-news,cbs-news,cnn,espn,the-huffington-post,fox-news,google-news,independent,the-washington-post,mtv-news,national-geographic,nbc-news,news24,new-york-magazine'/''/''/5/''`
      )
      .then((response) => {
        if (response.data.status === "ok") {
          networkDataReceived = true;
          this.setState({
            loading: false,
            error: false,
            news: response.data.articles,
          });
        } else {
          this.setState({
            error: true,
            theError: "Sorry! Problem loading new headlines!",
          });
        }
        return true;
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          error: true,
          theError: "Offline: Turn on data for latest headlines.",
        });
      });
  };

  fetchCountryOnline = () => {
    if (
      countryArray.filter(
        (country) =>
          Boolean(country.code === this.state.myCountry) &&
          Boolean(country.api === "newsAPI")
      )[0]
    ) {
      return axios
        .get(
          `${gnewsapiproxy}/topheadlines/''/${this.state.myCountry.toLowerCase()}/''/''/''/5/''`
        )
        .then((response) => {
          if (response.data.status === "ok") {
            networkDataReceived = true;
            this.setState({
              loading: false,
              error: false,
              countryNews: response.data.articles,
            });
          } else {
            this.setState({
              error: true,
              theError: "Sorry! Problem loading new headlines!",
            });
          }
          return true;
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            error: true,
            theError: "Offline: Turn on data for latest headlines.",
          });
        });
    }

    if (
      countryArray.filter(
        (country) =>
          Boolean(country.code === this.state.myCountry) &&
          Boolean(country.api === "gnews")
      )[0]
    ) {
      return axios
        .get(
          `${gnewsapiproxy}/topic/nation/${this.state.myCountry.toLowerCase()}/5`
        )
        .then((response) => {
          if (response.data.status === "ok") {
            networkDataReceived = true;
            this.setState({
              loading: false,
              error: false,
              countryNews: response.data.articles,
            });
          } else {
            this.setState({
              error: true,
              theError: "Sorry! Problem loading new headlines!",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            error: true,
            theError: "Offline: Turn on data for latest headlines.",
          });
        });
    }
  };

  UNSAFE_componentWillMount() {
    if (
      countryArray.filter((country) => country.code === this.state.myCountry)[0]
    )
      countryCovered = true;
    // fetch cached data
    const This = this;
    caches
      .open("mysite-dynamic")
      .then((cache) => {
        if (
          countryArray.filter(
            (country) =>
              Boolean(country.code === this.state.myCountry) &&
              Boolean(country.api === "newsAPI")
          )[0]
        ) {
          cache
            .match(
              `${gnewsapiproxy}/topheadlines/''/${this.state.myCountry.toLowerCase()}/''/''/''/5/''`,
              { ignoreMethod: true, ignoreVary: true }
            )
            .then(function (res) {
              if (!res) throw Error("No data");
              return res.json();
            })
            .then(function (response) {
              // don't overwrite newer network data
              if (!networkDataReceived) {
                This.setState({
                  loading: false,
                  countryNews: response.articles,
                });
              }
            })
            .catch((err) => {
              return console.log(err);
            });
        }
        if (
          countryCovered &&
          countryArray.filter(
            (country) =>
              Boolean(country.code === this.state.myCountry) &&
              Boolean(country.api === "gnews")
          )[0]
        ) {
          cache
            .match(
              gnewsapiproxy +
                "/topic/nation/" +
                this.state.myCountry.toLowerCase() +
                "/5",
              { ignoreMethod: true, ignoreVary: true }
            )
            .then(function (res) {
              if (!res) throw Error("No data");
              return res.json();
            })
            .then(function (response) {
              // don't overwrite newer network data
              if (!networkDataReceived) {
                This.setState({
                  loading: false,
                  countryNews: response.articles,
                });
              }
            })
            .catch((err) => {
              return console.log(err);
            });
        }
        cache
          .match(
            gnewsapiproxy +
              "/topheadlines/''/''/'abc-news,al-jazeera-english,bbc-news,bleacher-report,bloomberg,business-insider,cbc-news,cbs-news,cnn,espn,the-huffington-post,fox-news,google-news,independent,the-washington-post,mtv-news,national-geographic,nbc-news,news24,new-york-magazine'/''/''/5/''",
            { ignoreMethod: true, ignoreVary: true }
          )
          .then(function (res) {
            if (!res) throw Error("No data");
            return res.json();
          })
          .then(function (response) {
            // don't overwrite newer network data
            if (!networkDataReceived) {
              This.setState({
                loading: false,
                news: response.articles,
              });
            }
          })
          .catch((err) => {
            return console.log(err);
          });
        let cachegets = [];
        categoriesArray.map((cat) => {
          return cachegets.push(
            new Promise((resolve, reject) => {
              cache
                .match(
                  `${gnewsapiproxy}/topheadlines/''/''/${cat.sources}/''/''/5/''`,
                  { ignoreMethod: true, ignoreVary: true }
                )
                .then(function (res) {
                  if (!res) {
                    console.log("No data");
                    resolve(true);
                  }
                  return res.json();
                })
                .then(function (response) {
                  // don't overwrite newer network data
                  if (!networkDataReceived) {
                    This.setState({
                      loading: false,
                      [cat.id]: response.articles,
                    });
                  }
                  return true;
                })
                .then(() => resolve(true))
                .catch((err) => reject(err));
            })
          );
        });
        return Promise.all(cachegets);
      })
      .catch((err) => {
        console.log(err);
        This.setState({
          error: true,
          theError: "Sorry! Problem loading new headlines!",
        });
      });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.state.myCountry && countryCovered) this.fetchCountryOnline();
    this.fetchOnline();
    let catar = categoriesArray.map((category) => {
      return axios
        .get(
          `${gnewsapiproxy}/topheadlines/''/''/${category.sources}/''/''/5/''`
        )
        .then((response) => {
          if (response.data.status === "ok") {
            networkDataReceived = true;
            this.setState({
              loading: false,
              error: false,
              [category.id]: response.data.articles,
            });
          } else {
            this.setState({
              error: true,
              theError: "Sorry! Problem loading new headlines!",
            });
          }
          return true;
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            error: true,
            theError: "Offline: Turn on data for latest headlines.",
          });
        });
    });
    Promise.all(catar).then(() => {
      this.setState({ error: false });
    });
  }

  render() {
    const { classes } = this.props;
    const {
      loading,
      countryNews,
      news,
      error,
      theError,
      myCountry,
      business,
      entertainment,
      general,
      health,
      science,
      sports,
      technology,
      businessActive,
      entertainmentActive,
      generalActive,
      healthActive,
      scienceActive,
      sportsActive,
      newsActive,
      businessViz,
      entertainmentViz,
      generalViz,
      healthViz,
      scienceViz,
      sportsViz,
      technologyViz,
    } = this.state;
    const headers = [];
    let fetchError = error ? (
      <Alert
        className={classes.alert}
        elevation={6}
        variant="filled"
        severity="warning"
      >
        {theError}
      </Alert>
    ) : null;

    let newsMarkup = !loading ? (
      news.map((scream, ind) => {
        if (scream.title && !headers.includes(scream.title)) {
          headers.push(scream.title);
          return (
            <Scream
              key={`${scream.title}${ind}`}
              scream={scream}
              trending={true}
            />
          );
        } else return null;
      })
    ) : (
      <NewsSkeleton />
    );
    let countryNewsMarkup =
      !loading && countryCovered && countryNews.length > 0
        ? countryNews.map((scream, ind) => {
            if (scream.title && !headers.includes(scream.title)) {
              headers.push(scream.title);
              return (
                <Scream
                  key={`${scream.title}${ind}`}
                  scream={scream}
                  trending={true}
                />
              );
            } else return null;
          })
        : null;

    let generalMarkup =
      !loading && generalViz
        ? general.map((scream, ind) => {
            if (scream.title && !headers.includes(scream.title)) {
              headers.push(scream.title);
              return (
                <Scream
                  key={`${scream.title}${ind}`}
                  scream={scream}
                  trending={true}
                />
              );
            }
            else if (scream.title && headers.includes(scream.title)) {
                // headers.push(scream.title);
                return (
                  <Scream
                    key={`${scream.title}${ind}`}
                    scream={scream}
                    trending={true}
                  />
                );
              }
            else return null;
          })
        : null;
    let entertainmentMarkup =
      !loading && entertainmentViz
        ? entertainment.map((scream, ind) => {
            if (scream.title && !headers.includes(scream.title)) {
              headers.push(scream.title);
              return (
                <Scream
                  key={`${scream.title}${ind}`}
                  scream={scream}
                  trending={true}
                />
              );
            } else return null;
          })
        : null;
    let sportsMarkup =
      !loading && sportsViz
        ? sports.map((scream, ind) => {
            if (scream.title && !headers.includes(scream.title)) {
              headers.push(scream.title);
              return (
                <Scream
                  key={`${scream.title}${ind}`}
                  scream={scream}
                  trending={true}
                />
              );
            } else return null;
          })
        : null;
    let healthMarkup =
      !loading && healthViz
        ? health.map((scream, ind) => {
            if (scream.title && !headers.includes(scream.title)) {
              headers.push(scream.title);
              return (
                <Scream
                  key={`${scream.title}${ind}`}
                  scream={scream}
                  trending={true}
                />
              );
            } else return null;
          })
        : null;
    let businessMarkup =
      !loading && businessViz
        ? business.map((scream, ind) => {
            if (scream.title && !headers.includes(scream.title)) {
              headers.push(scream.title);
              return (
                <Scream
                  key={`${scream.title}${ind}`}
                  scream={scream}
                  trending={true}
                />
              );
            } else return null;
          })
        : null;
    let scienceMarkup =
      !loading && scienceViz
        ? science.map((scream, ind) => {
            if (scream.title && !headers.includes(scream.title)) {
              headers.push(scream.title);
              return (
                <Scream
                  key={`${scream.title}${ind}`}
                  scream={scream}
                  trending={true}
                />
              );
            } else return null;
          })
        : null;
    let technologyMarkup =
      !loading && technologyViz
        ? technology.map((scream, ind) => {
            if (scream.title && !headers.includes(scream.title)) {
              headers.push(scream.title);
              return (
                <Scream
                  key={`${scream.title}${ind}`}
                  scream={scream}
                  trending={true}
                />
              );
            } else return null;
          })
        : null;

    return (
      <Grid container spacing={1}>
        {fetchError}
        <Hidden smDown>
          <Grid item md={2}></Grid>
        </Hidden>
        <Grid item md={8} sm={9} xs={12}>
          {!loading && countryCovered && countryNews.length > 0 && (
            <Fragment>
              <Typography
                className={classes.titleheader}
                component={Link}
                href={"/country/" + myCountry.toLowerCase()}
                to={"/country/" + myCountry.toLowerCase()}
                variant="h4"
                color="textPrimary"
              >
                <b>
                  {
                    countryArray.filter(
                      (country) => country.code === myCountry
                    )[0].label
                  }{" "}
                  <ChevronRightIcon className={classes.muiIcons} />
                </b>
              </Typography>
              <hr />
            </Fragment>
          )}
          {countryNewsMarkup}
          {!loading && countryCovered && countryNews.length > 0 && (
            <ReadMore link={"/country/" + myCountry.toLowerCase()} />
          )}
          {countryCovered && countryNews.length > 0 && <br />}
          <VizSensor
            partialVisibility={true}
            active={newsActive}
            onChange={(isVisible) => {
              this.setState({
                generalViz: isVisible,
                newsActive: !isVisible,
                generalActive: true,
              });
              console.log("general: ",isVisible)
              console.log("general news: ",general)
            }}
          >
            <Fragment>
              {!loading && news.length > 0 && (
                <Fragment>
                  <Typography
                    className={classes.titleheader}
                    component={Link}
                    href={"/top-stories"}
                    to={"/top-stories"}
                    variant="h4"
                    color="textPrimary"
                  >
                    <b>
                      World headlines{" "}
                      <ChevronRightIcon className={classes.muiIcons} />
                    </b>
                  </Typography>
                  <hr />
                </Fragment>
              )}
              {newsMarkup}
              {!loading && news.length > 0 && (
                <ReadMore link={"/top-stories"} />
              )}
            </Fragment>
          </VizSensor>
          {!loading && news.length > 0 && <br />}
          <VizSensor
            partialVisibility={true}
            active={generalActive}
            onChange={(isVisible) => {
              this.setState({
                entertainmentViz: isVisible,
                generalActive: !isVisible,
                entertainmentActive: true,
              });
            }}
          >
            <Fragment>
              {!loading && generalViz && general.length > 0 && (
                <Fragment>
                  <Typography
                    className={classes.titleheader}
                    component={Link}
                    href={"/category/general"}
                    to={"/category/general"}
                    variant="h4"
                    color="textPrimary"
                  >
                    <b>
                      General <ChevronRightIcon className={classes.muiIcons} />
                    </b>
                  </Typography>
                  <hr />
                </Fragment>
              )}
              {generalMarkup}
              {!loading && generalViz && general.length > 0 && (
                <ReadMore link={"/category/general"} />
              )}
            </Fragment>
          </VizSensor>
          {!loading && generalViz && general.length > 0 && <br />}
          <VizSensor
            partialVisibility={true}
            active={entertainmentActive}
            onChange={(isVisible) => {
              this.setState({
                businessViz: isVisible,
                entertainmentActive: !isVisible,
                businessActive: true,
              });
            }}
          >
            <Fragment>
              {!loading && entertainmentViz && entertainment.length > 0 && (
                <Fragment>
                  <Typography
                    className={classes.titleheader}
                    component={Link}
                    href={"/category/entertainment"}
                    to={"/category/entertainment"}
                    variant="h4"
                    color="textPrimary"
                  >
                    <b>
                      Entertainment{" "}
                      <ChevronRightIcon className={classes.muiIcons} />
                    </b>
                  </Typography>
                  <hr />
                </Fragment>
              )}
              {entertainmentMarkup}
              {!loading && entertainmentViz && entertainment.length > 0 && (
                <ReadMore link={"/category/entertainment"} />
              )}
            </Fragment>
          </VizSensor>
          {!loading && entertainmentViz && entertainment.length > 0 && <br />}
          <VizSensor
            partialVisibility={true}
            active={businessActive}
            onChange={(isVisible) => {
              this.setState({
                healthViz: isVisible,
                businessActive: !isVisible,
                healthActive: true,
              });
            }}
          >
            <Fragment>
              {!loading && businessViz && business.length > 0 && (
                <Fragment>
                  <Typography
                    className={classes.titleheader}
                    component={Link}
                    href={"/category/business"}
                    to={"/category/business"}
                    variant="h4"
                    color="textPrimary"
                  >
                    <b>
                      Business <ChevronRightIcon className={classes.muiIcons} />
                    </b>
                  </Typography>
                  <hr />
                </Fragment>
              )}
              {businessMarkup}
              {!loading && businessViz && business.length > 0 && (
                <ReadMore link={"/category/business"} />
              )}
            </Fragment>
          </VizSensor>
          {!loading && businessViz && business.length > 0 && <br />}
          <VizSensor
            partialVisibility={true}
            active={healthActive}
            onChange={(isVisible) => {
              this.setState({
                scienceViz: isVisible,
                healthActive: !isVisible,
                scienceActive: true,
              });
            }}
          >
            <Fragment>
              {!loading && healthViz && health.length > 0 && (
                <Fragment>
                  <Typography
                    className={classes.titleheader}
                    component={Link}
                    href={"/category/health"}
                    to={"/category/health"}
                    variant="h4"
                    color="textPrimary"
                  >
                    <b>
                      Health <ChevronRightIcon className={classes.muiIcons} />
                    </b>
                  </Typography>
                  <hr />
                </Fragment>
              )}
              {healthMarkup}
              {!loading && healthViz && health.length > 0 && (
                <ReadMore link={"/category/health"} />
              )}
            </Fragment>
          </VizSensor>
          {!loading && healthViz && health.length > 0 && <br />}
          <VizSensor
            partialVisibility={true}
            active={scienceActive}
            onChange={(isVisible) => {
              this.setState({
                sportsViz: isVisible,
                scienceActive: !isVisible,
                sportsActive: true,
              });
            }}
          >
            <Fragment>
              {!loading && scienceViz && science.length > 0 && (
                <Fragment>
                  <Typography
                    className={classes.titleheader}
                    component={Link}
                    href={"/category/science"}
                    to={"/category/science"}
                    variant="h4"
                    color="textPrimary"
                  >
                    <b>
                      Science <ChevronRightIcon className={classes.muiIcons} />
                    </b>
                  </Typography>
                  <hr />
                </Fragment>
              )}
              {scienceMarkup}
              {!loading && scienceViz && science.length > 0 && (
                <ReadMore link={"/category/science"} />
              )}
            </Fragment>
          </VizSensor>
          {!loading && scienceViz && science.length > 0 && <br />}
          <VizSensor
            partialVisibility={true}
            active={sportsActive}
            onChange={(isVisible) => {
              this.setState({
                technologyViz: isVisible,
                sportsActive: !isVisible,
              });
            }}
          >
            <Fragment>
              {!loading && sportsViz && sports.length > 0 && (
                <Fragment>
                  <Typography
                    className={classes.titleheader}
                    component={Link}
                    href={"/category/sports"}
                    to={"/category/sports"}
                    variant="h4"
                    color="textPrimary"
                  >
                    <b>
                      Sports <ChevronRightIcon className={classes.muiIcons} />
                    </b>
                  </Typography>
                  <hr />
                </Fragment>
              )}
              {sportsMarkup}
              {!loading && sportsViz && sports.length > 0 && (
                <ReadMore link={"/category/sports"} />
              )}
            </Fragment>
          </VizSensor>
          {!loading && sportsViz && sports.length > 0 && <br />}
          {!loading && technologyViz && technology.length > 0 && (
            <Fragment>
              <Typography
                className={classes.titleheader}
                component={Link}
                href={"/category/technology"}
                to={"/category/technology"}
                variant="h4"
                color="textPrimary"
              >
                <b>
                  Technology <ChevronRightIcon className={classes.muiIcons} />
                </b>
              </Typography>
              <hr />
            </Fragment>
          )}
          {technologyMarkup}
          {!loading && technologyViz && technology.length > 0 && (
            <ReadMore link={"/category/technology"} />
          )}
        </Grid>
        <Hidden xsDown>
          <Grid item md={2} sm={3} xs={12}>
            <Categories category="All" country="All" urlTo="/category" />
            <Countries country="All" category="All" urlTo="/country" />
          </Grid>
        </Hidden>
      </Grid>
    );
  }
}

export default withSyles(styles)(home);
