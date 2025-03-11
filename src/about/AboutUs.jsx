import React from 'react';
import {Container, Typography, Grid2 as Grid, Card, CardContent, CardMedia, Link} from '@mui/material';
import {Link  as RouterLink} from "react-router-dom";
import vasilopita from "./vasilopita.jpg"
import metsovo from "./metsovo.jpg"
import strays from "./strays.jpg";

const AboutUs = () => {
    return (
            <Container
                    display="flex"
                    justifyContent="center"
                    sx={{
                        width: "100%",
                        padding: '2rem',
                        position: 'relative',
                        paddingTop: { xs: "10vh", md: "10vh" },
                        paddingBottom:"10vh",

                    }}
            >
                <Typography variant="h2" gutterBottom>
                    1ο Σύστημα Προσκόπων Ιωαννίνων
                </Typography>
                <Typography variant="body1">
                    Το 1ο Σύστημα Προσκόπων Ιωαννίνων αποτελεί ένα από τα παλαιότερα και πιο ενεργά προσκοπικά συστήματα στην περιοχή της Ηπείρου. Με έδρα τα Ιωάννινα, το Σύστημα μας προάγει τις αξίες του προσκοπισμού, προσφέροντας στα παιδιά και τους νέους της περιοχής ευκαιρίες για προσωπική ανάπτυξη, κοινωνική ευαισθητοποίηση και ενεργή συμμετοχή στην κοινότητα.
                </Typography>
                <Typography variant="body1">
                    Οι δράσεις μας περιλαμβάνουν:
                </Typography>
                <Grid container spacing={4}>
                    <Grid item size={{
                        xs:12,
                        sm:6,
                        md:4
                    }}>
                        <Card>
                            <CardMedia
                                    component="img"
                                    image={metsovo}
                                    alt="Εξερεύνηση στο Μέτσοβο"
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Εξερεύνηση στο Μέτσοβο
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Η Ομάδα Προσκόπων εξερεύνησε τις ομορφιές του Μετσόβου, ανακαλύπτοντας τη φύση και την ιστορία της περιοχής. Φιλία, περιπέτεια και ομαδικό πνεύμα ήταν στο επίκεντρο αυτής της εμπειρίας.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item size={{
                        xs: 12,
                        sm: 6,
                        md: 4
                    }}>
                        <Card>
                            <CardMedia
                                    component="img"
                                    image={strays}
                                    alt="Φροντίδα για τα αδέσποτα ζώα"
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Φροντίδα για τα Αδέσποτα Ζώα
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Το 1ο Σύστημα Προσκόπων Ιωαννίνων συμμετείχε ενεργά στην Παγκόσμια Ημέρα Αδέσποτων Ζώων, δείχνοντας την αγάπη και το ενδιαφέρον του για τα ζώα που το έχουν ανάγκη. Μέλη και φίλοι του συγκεντρώθηκαν για να προσφέρουν τροφή, νερό και φροντίδα στα αδέσποτα ζώα της περιοχής.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>


                    <Grid item size={{
                        xs:12,
                        sm:6,
                        md:4
                    }}>
                        <Card>
                            <CardMedia
                                    component="img"
                                    image={vasilopita}
                                    alt="Κοπή Πρωτοχρονιάτικης Πίτας"
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Κοπή Πρωτοχρονιάτικης Πίτας
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Στην Λέσχη 1ου Συστήματος Προσκόπων Ιωαννίνων, γονείς και μέλη του Συστήματος συγκεντρώθηκαν για την κοπή της πρωτοχρονιάτικης πίτας, ανταλλάσσοντας ευχές και συμμετέχοντας σε προσκοπικά παιχνίδια.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Typography variant="body1" >
                    Μέσω των προγραμμάτων και των δράσεών μας, επιδιώκουμε να καλλιεργήσουμε την υπευθυνότητα, την ομαδικότητα και την κοινωνική συνείδηση στα μέλη μας, συμβάλλοντας στη δημιουργία ενεργών και ευαισθητοποιημένων πολιτών.
                </Typography>
                <Typography variant="body1">
                    Για περισσότερες πληροφορίες ή για να εγγραφείτε, μπορείτε να{' '}
                    <Link component={RouterLink} to="/contact">
                        επικοινωνήσετε μαζί μας
                    </Link>.
                </Typography>
            </Container>
    );
};

export default AboutUs;
