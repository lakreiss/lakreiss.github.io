//Some code for the dart board is derived from https://app.dartboard.io/

//DART BOARD INFORMATION
var dart_board_data = [
'<path d="M 83.95350895058671,13.296929528419623 A 85 85 0 0 0 83.95350895058671,-13.296929528419623 L 40.49522196440065,-6.413813066649466 A 41 41 0 0 1 40.49522196440065,6.413813066649466 Z" class="odd single"></path>','<path d="M 105.68265244367974,16.738487759304704 A 107 107 0 0 0 105.68265244367974,-16.738487759304704 L 83.95350895058671,-13.296929528419623 A 85 85 0 0 1 83.95350895058671,13.296929528419623 Z" class="odd triple"></path>','<path d="M 148.15325108927067,23.46516975603463 A 150 150 0 0 0 148.15325108927067,-23.46516975603463 L 105.68265244367974,-16.738487759304704 A 107 107 0 0 1 105.68265244367974,16.738487759304704 Z" class="odd single"></path>','<path d="M 167.90701790117342,26.593859056839246 A 170 170 0 0 0 167.90701790117342,-26.593859056839246 L 148.15325108927067,-23.46516975603463 A 150 150 0 0 1 148.15325108927067,23.46516975603463 Z" class="odd double"></path>','<path d="M 75.73555455601127,38.589192477861474 A 85 85 0 0 0 83.95350895058671,13.296929528419623 L 40.49522196440065,6.413813066649466 A 41 41 0 0 1 36.531267491723085,18.613610489321417 Z" class="even single"></path>','<path d="M 95.33769808815536,48.5769834721315 A 107 107 0 0 0 105.68265244367974,16.738487759304704 L 83.95350895058671,13.296929528419623 A 85 85 0 0 1 75.73555455601127,38.589192477861474 Z" class="even triple"></path>','<path d="M 133.6509786282552,68.09857496093201 A 150 150 0 0 0 148.15325108927067,23.46516975603463 L 105.68265244367974,16.738487759304704 A 107 107 0 0 1 95.33769808815536,48.5769834721315 Z" class="even single"></path>','<path d="M 151.47110911202253,77.17838495572295 A 170 170 0 0 0 167.90701790117342,26.593859056839246 L 148.15325108927067,23.46516975603463 A 150 150 0 0 1 133.6509786282552,68.09857496093201 Z" class="even double"></path>','<path d="M 60.10407640085654,60.104076400856535 A 85 85 0 0 0 75.73555455601127,38.589192477861474 L 36.531267491723085,18.613610489321417 A 41 41 0 0 1 28.99137802864845,28.991378028648445 Z" class="odd single"></path>','<path d="M 75.66042558696059,75.66042558696059 A 107 107 0 0 0 95.33769808815536,48.5769834721315 L 75.73555455601127,38.589192477861474 A 85 85 0 0 1 60.10407640085654,60.104076400856535 Z" class="odd triple"></path>','<path d="M 106.06601717798213,106.06601717798212 A 150 150 0 0 0 133.6509786282552,68.09857496093201 L 95.33769808815536,48.5769834721315 A 107 107 0 0 1 75.66042558696059,75.66042558696059 Z" class="odd single"></path>','<path d="M 120.20815280171308,120.20815280171307 A 170 170 0 0 0 151.47110911202253,77.17838495572295 L 133.6509786282552,68.09857496093201 A 150 150 0 0 1 106.06601717798213,106.06601717798212 Z" class="odd double"></path>','<path d="M 38.58919247786148,75.73555455601127 A 85 85 0 0 0 60.10407640085654,60.104076400856535 L 28.99137802864845,28.991378028648445 A 41 41 0 0 1 18.61361048932142,36.53126749172308 Z" class="even single"></path>','<path d="M 48.576983472131516,95.33769808815535 A 107 107 0 0 0 75.66042558696059,75.66042558696059 L 60.10407640085654,60.104076400856535 A 85 85 0 0 1 38.58919247786148,75.73555455601127 Z" class="even triple"></path>','<path d="M 68.09857496093203,133.65097862825516 A 150 150 0 0 0 106.06601717798213,106.06601717798212 L 75.66042558696059,75.66042558696059 A 107 107 0 0 1 48.576983472131516,95.33769808815535 Z" class="even single"></path>','<path d="M 77.17838495572296,151.47110911202253 A 170 170 0 0 0 120.20815280171308,120.20815280171307 L 106.06601717798213,106.06601717798212 A 150 150 0 0 1 68.09857496093203,133.65097862825516 Z" class="even double"></path>','<path d="M 13.296929528419628,83.95350895058671 A 85 85 0 0 0 38.58919247786148,75.73555455601127 L 18.61361048932142,36.53126749172308 A 41 41 0 0 1 6.4138130666494675,40.49522196440065 Z" class="odd single"></path>','<path d="M 16.738487759304707,105.68265244367974 A 107 107 0 0 0 48.576983472131516,95.33769808815535 L 38.58919247786148,75.73555455601127 A 85 85 0 0 1 13.296929528419628,83.95350895058671 Z" class="odd triple"></path>','<path d="M 23.465169756034637,148.15325108927067 A 150 150 0 0 0 68.09857496093203,133.65097862825516 L 48.576983472131516,95.33769808815535 A 107 107 0 0 1 16.738487759304707,105.68265244367974 Z" class="odd single"></path>','<path d="M 26.593859056839257,167.90701790117342 A 170 170 0 0 0 77.17838495572296,151.47110911202253 L 68.09857496093203,133.65097862825516 A 150 150 0 0 1 23.465169756034637,148.15325108927067 Z" class="odd double"></path>','<path d="M -13.29692952841962,83.95350895058671 A 85 85 0 0 0 13.296929528419628,83.95350895058671 L 6.4138130666494675,40.49522196440065 A 41 41 0 0 1 -6.413813066649463,40.49522196440065 Z" class="even single"></path>','<path d="M -16.738487759304697,105.68265244367974 A 107 107 0 0 0 16.738487759304707,105.68265244367974 L 13.296929528419628,83.95350895058671 A 85 85 0 0 1 -13.29692952841962,83.95350895058671 Z" class="even triple"></path>','<path d="M -23.465169756034623,148.15325108927067 A 150 150 0 0 0 23.465169756034637,148.15325108927067 L 16.738487759304707,105.68265244367974 A 107 107 0 0 1 -16.738487759304697,105.68265244367974 Z" class="even single"></path>','<path d="M -26.59385905683924,167.90701790117342 A 170 170 0 0 0 26.593859056839257,167.90701790117342 L 23.465169756034637,148.15325108927067 A 150 150 0 0 1 -23.465169756034623,148.15325108927067 Z" class="even double"></path>','<path d="M -38.589192477861474,75.73555455601127 A 85 85 0 0 0 -13.29692952841962,83.95350895058671 L -6.413813066649463,40.49522196440065 A 41 41 0 0 1 -18.613610489321417,36.531267491723085 Z" class="odd single"></path>','<path d="M -48.5769834721315,95.33769808815536 A 107 107 0 0 0 -16.738487759304697,105.68265244367974 L -13.29692952841962,83.95350895058671 A 85 85 0 0 1 -38.589192477861474,75.73555455601127 Z" class="odd triple"></path>','<path d="M -68.09857496093201,133.6509786282552 A 150 150 0 0 0 -23.465169756034623,148.15325108927067 L -16.738487759304697,105.68265244367974 A 107 107 0 0 1 -48.5769834721315,95.33769808815536 Z" class="odd single"></path>','<path d="M -77.17838495572295,151.47110911202253 A 170 170 0 0 0 -26.59385905683924,167.90701790117342 L -23.465169756034623,148.15325108927067 A 150 150 0 0 1 -68.09857496093201,133.6509786282552 Z" class="odd double"></path>','<path d="M -60.104076400856535,60.10407640085654 A 85 85 0 0 0 -38.589192477861474,75.73555455601127 L -18.613610489321417,36.531267491723085 A 41 41 0 0 1 -28.991378028648445,28.99137802864845 Z" class="even single"></path>','<path d="M -75.66042558696059,75.66042558696059 A 107 107 0 0 0 -48.5769834721315,95.33769808815536 L -38.589192477861474,75.73555455601127 A 85 85 0 0 1 -60.104076400856535,60.10407640085654 Z" class="even triple"></path>','<path d="M -106.06601717798212,106.06601717798213 A 150 150 0 0 0 -68.09857496093201,133.6509786282552 L -48.5769834721315,95.33769808815536 A 107 107 0 0 1 -75.66042558696059,75.66042558696059 Z" class="even single"></path>','<path d="M -120.20815280171307,120.20815280171308 A 170 170 0 0 0 -77.17838495572295,151.47110911202253 L -68.09857496093201,133.6509786282552 A 150 150 0 0 1 -106.06601717798212,106.06601717798213 Z" class="even double"></path>','<path d="M -75.73555455601127,38.58919247786148 A 85 85 0 0 0 -60.104076400856535,60.10407640085654 L -28.991378028648445,28.99137802864845 A 41 41 0 0 1 -36.53126749172308,18.61361048932142 Z" class="odd single"></path>','<path d="M -95.33769808815535,48.576983472131516 A 107 107 0 0 0 -75.66042558696059,75.66042558696059 L -60.104076400856535,60.10407640085654 A 85 85 0 0 1 -75.73555455601127,38.58919247786148 Z" class="odd triple"></path>','<path d="M -133.65097862825516,68.09857496093203 A 150 150 0 0 0 -106.06601717798212,106.06601717798213 L -75.66042558696059,75.66042558696059 A 107 107 0 0 1 -95.33769808815535,48.576983472131516 Z" class="odd single"></path>','<path d="M -151.47110911202253,77.17838495572296 A 170 170 0 0 0 -120.20815280171307,120.20815280171308 L -106.06601717798212,106.06601717798213 A 150 150 0 0 1 -133.65097862825516,68.09857496093203 Z" class="odd double"></path>','<path d="M -83.9535089505867,13.296929528419634 A 85 85 0 0 0 -75.73555455601127,38.58919247786148 L -36.53126749172308,18.61361048932142 A 41 41 0 0 1 -40.49522196440064,6.41381306664947 Z" class="even single"></path>','<path d="M -105.68265244367973,16.738487759304714 A 107 107 0 0 0 -95.33769808815535,48.576983472131516 L -75.73555455601127,38.58919247786148 A 85 85 0 0 1 -83.9535089505867,13.296929528419634 Z" class="even triple"></path>','<path d="M -148.15325108927064,23.465169756034648 A 150 150 0 0 0 -133.65097862825516,68.09857496093203 L -95.33769808815535,48.576983472131516 A 107 107 0 0 1 -105.68265244367973,16.738487759304714 Z" class="even single"></path>','<path d="M -167.9070179011734,26.593859056839268 A 170 170 0 0 0 -151.47110911202253,77.17838495572296 L -133.65097862825516,68.09857496093203 A 150 150 0 0 1 -148.15325108927064,23.465169756034648 Z" class="even double"></path>','<path d="M -83.95350895058671,-13.296929528419613 A 85 85 0 0 0 -83.9535089505867,13.296929528419634 L -40.49522196440064,6.41381306664947 A 41 41 0 0 1 -40.49522196440065,-6.41381306664946 Z" class="odd single"></path>','<path d="M -105.68265244367974,-16.73848775930469 A 107 107 0 0 0 -105.68265244367973,16.738487759304714 L -83.9535089505867,13.296929528419634 A 85 85 0 0 1 -83.95350895058671,-13.296929528419613 Z" class="odd triple"></path>','<path d="M -148.15325108927067,-23.46516975603461 A 150 150 0 0 0 -148.15325108927064,23.465169756034648 L -105.68265244367973,16.738487759304714 A 107 107 0 0 1 -105.68265244367974,-16.73848775930469 Z" class="odd single"></path>','<path d="M -167.90701790117342,-26.593859056839225 A 170 170 0 0 0 -167.9070179011734,26.593859056839268 L -148.15325108927064,23.465169756034648 A 150 150 0 0 1 -148.15325108927067,-23.46516975603461 Z" class="odd double"></path>',
'<path d="M -75.73555455601127,-38.58919247786147 A 85 85 0 0 0 -83.95350895058671,-13.296929528419613 L -40.49522196440065,-6.41381306664946 A 41 41 0 0 1 -36.531267491723085,-18.613610489321413 Z" class="even single"></path>','<path d="M -95.33769808815536,-48.576983472131495 A 107 107 0 0 0 -105.68265244367974,-16.73848775930469 L -83.95350895058671,-13.296929528419613 A 85 85 0 0 1 -75.73555455601127,-38.58919247786147 Z" class="even triple"></path>','<path d="M -133.6509786282552,-68.098574960932 A 150 150 0 0 0 -148.15325108927067,-23.46516975603461 L -105.68265244367974,-16.73848775930469 A 107 107 0 0 1 -95.33769808815536,-48.576983472131495 Z" class="even single"></path>','<path d="M -151.47110911202253,-77.17838495572293 A 170 170 0 0 0 -167.90701790117342,-26.593859056839225 L -148.15325108927067,-23.46516975603461 A 150 150 0 0 1 -133.6509786282552,-68.098574960932 Z" class="even double"></path>','<path d="M -60.104076400856556,-60.104076400856535 A 85 85 0 0 0 -75.73555455601127,-38.58919247786147 L -36.531267491723085,-18.613610489321413 A 41 41 0 0 1 -28.991378028648455,-28.991378028648445 Z" class="odd single"></path>','<path d="M -75.6604255869606,-75.66042558696059 A 107 107 0 0 0 -95.33769808815536,-48.576983472131495 L -75.73555455601127,-38.58919247786147 A 85 85 0 0 1 -60.104076400856556,-60.104076400856535 Z" class="odd triple"></path>','<path d="M -106.06601717798215,-106.06601717798212 A 150 150 0 0 0 -133.6509786282552,-68.098574960932 L -95.33769808815536,-48.576983472131495 A 107 107 0 0 1 -75.6604255869606,-75.66042558696059 Z" class="odd single"></path>','<path d="M -120.20815280171311,-120.20815280171307 A 170 170 0 0 0 -151.47110911202253,-77.17838495572293 L -133.6509786282552,-68.098574960932 A 150 150 0 0 1 -106.06601717798215,-106.06601717798212 Z" class="odd double"></path>','<path d="M -38.58919247786149,-75.73555455601127 A 85 85 0 0 0 -60.104076400856556,-60.104076400856535 L -28.991378028648455,-28.991378028648445 A 41 41 0 0 1 -18.613610489321424,-36.53126749172308 Z" class="even single"></path>','<path d="M -48.57698347213152,-95.33769808815535 A 107 107 0 0 0 -75.6604255869606,-75.66042558696059 L -60.104076400856556,-60.104076400856535 A 85 85 0 0 1 -38.58919247786149,-75.73555455601127 Z" class="even triple"></path>','<path d="M -68.09857496093204,-133.65097862825516 A 150 150 0 0 0 -106.06601717798215,-106.06601717798212 L -75.6604255869606,-75.66042558696059 A 107 107 0 0 1 -48.57698347213152,-95.33769808815535 Z" class="even single"></path>','<path d="M -77.17838495572298,-151.47110911202253 A 170 170 0 0 0 -120.20815280171311,-120.20815280171307 L -106.06601717798215,-106.06601717798212 A 150 150 0 0 1 -68.09857496093204,-133.65097862825516 Z" class="even double"></path>','<path d="M -13.296929528419637,-83.9535089505867 A 85 85 0 0 0 -38.58919247786149,-75.73555455601127 L -18.613610489321424,-36.53126749172308 A 41 41 0 0 1 -6.413813066649473,-40.49522196440064 Z" class="odd single"></path>','<path d="M -16.73848775930472,-105.68265244367973 A 107 107 0 0 0 -48.57698347213152,-95.33769808815535 L -38.58919247786149,-75.73555455601127 A 85 85 0 0 1 -13.296929528419637,-83.9535089505867 Z" class="odd triple"></path>','<path d="M -23.465169756034655,-148.15325108927064 A 150 150 0 0 0 -68.09857496093204,-133.65097862825516 L -48.57698347213152,-95.33769808815535 A 107 107 0 0 1 -16.73848775930472,-105.68265244367973 Z" class="odd single"></path>','<path d="M -26.593859056839275,-167.9070179011734 A 170 170 0 0 0 -77.17838495572298,-151.47110911202253 L -68.09857496093204,-133.65097862825516 A 150 150 0 0 1 -23.465169756034655,-148.15325108927064 Z" class="odd double"></path>','<path d="M 13.296929528419607,-83.95350895058671 A 85 85 0 0 0 -13.296929528419637,-83.9535089505867 L -6.413813066649473,-40.49522196440064 A 41 41 0 0 1 6.413813066649458,-40.49522196440065 Z" class="even single"></path>','<path d="M 16.738487759304682,-105.68265244367974 A 107 107 0 0 0 -16.73848775930472,-105.68265244367973 L -13.296929528419637,-83.9535089505867 A 85 85 0 0 1 13.296929528419607,-83.95350895058671 Z" class="even triple"></path>','<path d="M 23.4651697560346,-148.15325108927067 A 150 150 0 0 0 -23.465169756034655,-148.15325108927064 L -16.73848775930472,-105.68265244367973 A 107 107 0 0 1 16.738487759304682,-105.68265244367974 Z" class="even single"></path>','<path d="M 26.593859056839214,-167.90701790117342 A 170 170 0 0 0 -26.593859056839275,-167.9070179011734 L -23.465169756034655,-148.15325108927064 A 150 150 0 0 1 23.4651697560346,-148.15325108927067 Z" class="even double"></path>','<path d="M 38.58919247786147,-75.73555455601128 A 85 85 0 0 0 13.296929528419607,-83.95350895058671 L 6.413813066649458,-40.49522196440065 A 41 41 0 0 1 18.613610489321413,-36.531267491723085 Z" class="odd single"></path>','<path d="M 48.57698347213149,-95.33769808815538 A 107 107 0 0 0 16.738487759304682,-105.68265244367974 L 13.296929528419607,-83.95350895058671 A 85 85 0 0 1 38.58919247786147,-75.73555455601128 Z" class="odd triple"></path>','<path d="M 68.098574960932,-133.6509786282552 A 150 150 0 0 0 23.4651697560346,-148.15325108927067 L 16.738487759304682,-105.68265244367974 A 107 107 0 0 1 48.57698347213149,-95.33769808815538 Z" class="odd single"></path>','<path d="M 77.17838495572293,-151.47110911202256 A 170 170 0 0 0 26.593859056839214,-167.90701790117342 L 23.4651697560346,-148.15325108927067 A 150 150 0 0 1 68.098574960932,-133.6509786282552 Z" class="odd double"></path>','<path d="M 60.10407640085653,-60.104076400856556 A 85 85 0 0 0 38.58919247786147,-75.73555455601128 L 18.613610489321413,-36.531267491723085 A 41 41 0 0 1 28.99137802864844,-28.991378028648455 Z" class="even single"></path>','<path d="M 75.66042558696057,-75.6604255869606 A 107 107 0 0 0 48.57698347213149,-95.33769808815538 L 38.58919247786147,-75.73555455601128 A 85 85 0 0 1 60.10407640085653,-60.104076400856556 Z" class="even triple"></path>','<path d="M 106.0660171779821,-106.06601717798215 A 150 150 0 0 0 68.098574960932,-133.6509786282552 L 48.57698347213149,-95.33769808815538 A 107 107 0 0 1 75.66042558696057,-75.6604255869606 Z" class="even single"></path>','<path d="M 120.20815280171306,-120.20815280171311 A 170 170 0 0 0 77.17838495572293,-151.47110911202256 L 68.098574960932,-133.6509786282552 A 150 150 0 0 1 106.0660171779821,-106.06601717798215 Z" class="even double"></path>','<path d="M 75.73555455601127,-38.589192477861495 A 85 85 0 0 0 60.10407640085653,-60.104076400856556 L 28.99137802864844,-28.991378028648455 A 41 41 0 0 1 36.53126749172308,-18.613610489321427 Z" class="odd single"></path>','<path d="M 95.33769808815535,-48.57698347213152 A 107 107 0 0 0 75.66042558696057,-75.6604255869606 L 60.10407640085653,-60.104076400856556 A 85 85 0 0 1 75.73555455601127,-38.589192477861495 Z" class="odd triple"></path>','<path d="M 133.65097862825516,-68.09857496093204 A 150 150 0 0 0 106.0660171779821,-106.06601717798215 L 75.66042558696057,-75.6604255869606 A 107 107 0 0 1 95.33769808815535,-48.57698347213152 Z" class="odd single"></path>','<path d="M 151.47110911202253,-77.17838495572299 A 170 170 0 0 0 120.20815280171306,-120.20815280171311 L 106.0660171779821,-106.06601717798215 A 150 150 0 0 1 133.65097862825516,-68.09857496093204 Z" class="odd double"></path>','<path d="M 83.9535089505867,-13.296929528419644 A 85 85 0 0 0 75.73555455601127,-38.589192477861495 L 36.53126749172308,-18.613610489321427 A 41 41 0 0 1 40.49522196440064,-6.4138130666494755 Z" class="even single"></path>','<path d="M 105.68265244367973,-16.73848775930473 A 107 107 0 0 0 95.33769808815535,-48.57698347213152 L 75.73555455601127,-38.589192477861495 A 85 85 0 0 1 83.9535089505867,-13.296929528419644 Z" class="even triple"></path>','<path d="M 148.15325108927064,-23.46516975603467 A 150 150 0 0 0 133.65097862825516,-68.09857496093204 L 95.33769808815535,-48.57698347213152 A 107 107 0 0 1 105.68265244367973,-16.73848775930473 Z" class="even single"></path>','<path d="M 167.9070179011734,-26.59385905683929 A 170 170 0 0 0 151.47110911202253,-77.17838495572299 L 133.65097862825516,-68.09857496093204 A 150 150 0 0 1 148.15325108927064,-23.46516975603467 Z" class="even double"></path>'
]
var dart_board_numbers = [6, 13, 4, 18, 1, 20, 5, 12, 9, 14, 11, 8, 16, 7, 19, 3, 17, 2, 15, 10];

// STANDARD DART INFO
var NUM_THROWS_PER_TURN = 3;
var num_players = 2; //keeping this lowercase because it might not be FINAL at some point //TODO this will be dynamic when users can add/subtract players

// DATA TO KEEP TRACK OF DURING THE GAME
var cur_throw = 0; //increment each throw, mod by NUM_THROWS_PER_TURN - 1
var cur_turn = 0; //0 means it's the first players turn. increment and mod by num_players each throw
var cur_starting_score;
var player_names = [];
var player_scores = [];
var player_all_throws = [];
var player_wins = [];
var player_cur_throws = [];
const BLACK_DOT = "\u25CF";

// FRONT PAGE CODE

function set_game_type_element() {
    var game_select_value = get_game_type();;
    if (game_select_value === "0") { //classic game
        write_classic_game_options_html();
    } else if (game_select_value === "1") { //cricket
        write_cricket_game_options_html();
    }
}

function get_game_type() {
    return (<HTMLInputElement> document.getElementById("game_select")).value;
}

function write_classic_game_options_html() {
    var game_option_container = document.getElementById('game_option_container');
    var innerHTML_text = '<span>Starting Point Total</span><br>';
    for (var i = 1; i <= 5; i++) {
        var cur_total = -100 + (200 * i) + 1;
        if (i != 3) {
            innerHTML_text += ('<input type="radio" id="game_option_number_' + i + '" name="game_option_item" class="game_option_item" value="' + cur_total + '" />');
        } else {
            innerHTML_text += ('<input type="radio" id="game_option_number_' + i + '" name="game_option_item" class="game_option_item" value="' + cur_total + '" checked/>');
        }
        innerHTML_text += ('<label for="game_option_number_' + i + '" style="width: 16%;">' + cur_total + '</label>');
    }
    game_option_container.innerHTML = innerHTML_text;
}

function write_cricket_game_options_html() {
    var game_option_container = document.getElementById('game_option_container');
    var innerHTML_text = '<span>Rule Set</span><br>';

    innerHTML_text += ('<input type="radio" id="game_option_ruleset_1" name="game_option_item" class="game_option_item" value="house_rules" checked/>');
    innerHTML_text += ('<label for="game_option_ruleset_1" style="width: 40%;">House Rules</label>');

    innerHTML_text += ('<input type="radio" id="game_option_ruleset_2" name="game_option_item" class="game_option_item" value="official_rules"/>');
    innerHTML_text += ('<label for="game_option_ruleset_2" style="width: 40%;">Official Rules</label>');
    
    game_option_container.innerHTML = innerHTML_text;
}

function build_dart_board() {
    //BUILD THE RINGS
    var dart_board_container:Element = document.getElementById("dart_board");
    var innerHTML_text = '<svg id="dart_board_svg" viewBox="0 0 420 420" class="dartboard" onclick="dart_hit(\'' + 0 + '\')">';
    innerHTML_text += '<g transform="translate(210, 210) scale(1, -1)">';
    innerHTML_text += '<circle class="out" cx="0" cy="0" r="9999"></circle>';
    
    //TODO: add onclick to bullseye parts and maybe outer wall too
    innerHTML_text += '<circle class="single-bull" cx="0" cy="0" r="41" onclick="dart_hit(\'' + 25 + '\')"></circle>';
    innerHTML_text += '<circle class="double-bull" cx="0" cy="0" r="16" onclick="dart_hit(\'' + 50 + '\')"></circle>';

    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 4; j++) {
            var multiplier_text = "";
            if (j == 1) {
                multiplier_text = "T";
            } else if (j == 3) {
                multiplier_text = "D";
            }
            var cur_html = dart_board_data[4 * i + j];
            var split_html = cur_html.split("><");
            var onclick = 'onclick="dart_hit(\'' + multiplier_text + dart_board_numbers[i] + '\');"';
            innerHTML_text += split_html[0] + onclick + "><" + split_html[1];
        }
    }
    innerHTML_text += "</g>"

    //BUILD THE NUMBERS

    innerHTML_text += '<g transform="translate(210, 210)">';
    for (var i = 0; i < 20; i++) {
        var cur_number = dart_board_numbers[i];
        var cur_rotation = 90 - (18 * i);
        innerHTML_text += '<text class="number" x="0" y="-180" transform="rotate(' + cur_rotation + ', 0, 0)">' + cur_number + '</text>';
    }
    innerHTML_text += '</g>';
    innerHTML_text += "</svg>"

    //SET THE HTML
    dart_board_container.innerHTML = innerHTML_text;
}



//GAME CODE

//TODO:
/*
make left side into a dart board √
make right side into player names, 


*/

function set_up_and_start_game() {
    // CHANGE LAYOUT
    document.getElementById('description').setAttribute('hidden', "true");
    document.getElementById('dart_board').removeAttribute('hidden');
    document.getElementById('start_form').setAttribute('hidden', "true");
    document.getElementById('game_text_container').removeAttribute('hidden');


    //TODO:
    /*
    make submit button check to see if everything has been filled out
    maybe use "required" tag on form elements
    not really urgent or important, but might be good if i add more customizable options for games
    */

    // GET INFO FROM FORM 
    // SET NAMES
    for (var i = 0; i < num_players; i++) {
        var cur_player_name = (<HTMLInputElement> document.getElementById('player_' + (i + 1) + '_name_input')).value;
        // console.log("player", i + 1, "has name", cur_player_name);
        if (cur_player_name.trim() == "") {
            cur_player_name = "Player " + (i + 1);
        }
        player_names.push(cur_player_name);
        document.getElementById('player_' + (i + 1) + '_name').innerHTML = cur_player_name;
    }

    console.log(player_names);

    // SET SCORES, WHICH ARE DEPENDANT ON TYPE
    var game_type = get_game_type();
    if (game_type === "0") { //classic game
        var radios = document.getElementsByTagName('input');
        var starting_score;
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].type === 'radio' && radios[i].checked) {
                // get value, set checked flag or do whatever you need to
                starting_score = radios[i].value;       
            }
        }
        // console.log(starting_score);

        for (var i = 0; i < num_players; i++) {
            player_scores.push(starting_score);
        }
        display_updated_scores();
        

        
        // console.log(player_scores);

    } else if (game_type === "1") { //cricket game
        //TODO: make the cricket game score system
    }

    // SET UP PLAYER DATA
    

    begin_turn(0);
}

function begin_turn(player_id) {
    var cur_throws_element = document.getElementById('player_' + (player_id + 1) + '_throws_cur_turn');
    var cur_html = BLACK_DOT;
    for (var i = 1; i < NUM_THROWS_PER_TURN; i++) {
        cur_html += " " + BLACK_DOT;
    }
    cur_throws_element.innerHTML = cur_html;
    cur_starting_score = player_scores[player_id];
}

var scored = false;
function dart_hit(board_location: string) {
    console.log("dart hit", board_location);
    if (board_location != "0") { //hit the target somewhere, not the outside area
        scored = true; 
        //process hit location
        process_hit(board_location);
    } else if (scored) { //the outside hit gets called even if the main board is also hit, so this ignores those calls and resets
        scored = false;
    } else { //count it as a 0
        //process hit location
        process_hit(board_location);
    }
}

function process_hit(board_location: string) {
    player_cur_throws.push(board_location);
    console.log("board location", board_location)

    cur_starting_score -= get_score_of_hit_at(board_location);
    display_updated_scores(cur_starting_score);


    if (player_cur_throws.length >= NUM_THROWS_PER_TURN) {
        //TURN IS OVER, PROCESS TURN
        // PROCESS THROWS, SUBTRACT FROM TRUE SCORE IF VALID, ADD TO THROWS LIST

        // CHANGE CUR_TURN, RESET CUR DATA
        cur_turn = (cur_turn + 1) % num_players;
        player_cur_throws = [];
    }
}

function display_updated_scores(cur_score_of_cur_player=null) {
    var cur_player_score;
    if (cur_score_of_cur_player) { //game is happening, use passed in parameter for cur players score
        for (var i = 0; i < num_players; i++) {
            if (i === cur_turn) {
                cur_player_score = cur_score_of_cur_player;
            } else {
                cur_player_score = player_scores[cur_turn];
            }
            document.getElementById('player_' + (i + 1) + '_score').innerHTML = cur_player_score;
        }

    } else { //game is being set up, use both players cur scores
        for (var i = 0; i < num_players; i++) {
            cur_player_score = player_scores[cur_turn];
            document.getElementById('player_' + (i + 1) + '_score').innerHTML = cur_player_score;
        }
    }
}

function get_score_of_hit_at(board_location) {
    if (board_location === "0") {
        return 0;
    } else if (board_location.charAt(0) === "D") {
        return parseInt(board_location.substring(1)) * 2;
    } else if (board_location.charAt(0) === "T") {
        return parseInt(board_location.substring(1)) * 3;
    } else {
        return parseInt(board_location);
    }
}