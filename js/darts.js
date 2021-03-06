//Some code for the dart board is derived from https://app.dartboard.io/
//DART BOARD INFORMATION
var dart_board_data = [
    '<path d="M 83.95350895058671,13.296929528419623 A 85 85 0 0 0 83.95350895058671,-13.296929528419623 L 40.49522196440065,-6.413813066649466 A 41 41 0 0 1 40.49522196440065,6.413813066649466 Z" class="tooltip odd single"></path>', '<path d="M 105.68265244367974,16.738487759304704 A 107 107 0 0 0 105.68265244367974,-16.738487759304704 L 83.95350895058671,-13.296929528419623 A 85 85 0 0 1 83.95350895058671,13.296929528419623 Z" class="tooltip odd triple"></path>', '<path d="M 148.15325108927067,23.46516975603463 A 150 150 0 0 0 148.15325108927067,-23.46516975603463 L 105.68265244367974,-16.738487759304704 A 107 107 0 0 1 105.68265244367974,16.738487759304704 Z" class="tooltip odd single"></path>', '<path d="M 167.90701790117342,26.593859056839246 A 170 170 0 0 0 167.90701790117342,-26.593859056839246 L 148.15325108927067,-23.46516975603463 A 150 150 0 0 1 148.15325108927067,23.46516975603463 Z" class="tooltip odd double"></path>', '<path d="M 75.73555455601127,38.589192477861474 A 85 85 0 0 0 83.95350895058671,13.296929528419623 L 40.49522196440065,6.413813066649466 A 41 41 0 0 1 36.531267491723085,18.613610489321417 Z" class="tooltip even single"></path>', '<path d="M 95.33769808815536,48.5769834721315 A 107 107 0 0 0 105.68265244367974,16.738487759304704 L 83.95350895058671,13.296929528419623 A 85 85 0 0 1 75.73555455601127,38.589192477861474 Z" class="tooltip even triple"></path>', '<path d="M 133.6509786282552,68.09857496093201 A 150 150 0 0 0 148.15325108927067,23.46516975603463 L 105.68265244367974,16.738487759304704 A 107 107 0 0 1 95.33769808815536,48.5769834721315 Z" class="tooltip even single"></path>', '<path d="M 151.47110911202253,77.17838495572295 A 170 170 0 0 0 167.90701790117342,26.593859056839246 L 148.15325108927067,23.46516975603463 A 150 150 0 0 1 133.6509786282552,68.09857496093201 Z" class="tooltip even double"></path>', '<path d="M 60.10407640085654,60.104076400856535 A 85 85 0 0 0 75.73555455601127,38.589192477861474 L 36.531267491723085,18.613610489321417 A 41 41 0 0 1 28.99137802864845,28.991378028648445 Z" class="tooltip odd single"></path>', '<path d="M 75.66042558696059,75.66042558696059 A 107 107 0 0 0 95.33769808815536,48.5769834721315 L 75.73555455601127,38.589192477861474 A 85 85 0 0 1 60.10407640085654,60.104076400856535 Z" class="tooltip odd triple"></path>', '<path d="M 106.06601717798213,106.06601717798212 A 150 150 0 0 0 133.6509786282552,68.09857496093201 L 95.33769808815536,48.5769834721315 A 107 107 0 0 1 75.66042558696059,75.66042558696059 Z" class="tooltip odd single"></path>', '<path d="M 120.20815280171308,120.20815280171307 A 170 170 0 0 0 151.47110911202253,77.17838495572295 L 133.6509786282552,68.09857496093201 A 150 150 0 0 1 106.06601717798213,106.06601717798212 Z" class="tooltip odd double"></path>', '<path d="M 38.58919247786148,75.73555455601127 A 85 85 0 0 0 60.10407640085654,60.104076400856535 L 28.99137802864845,28.991378028648445 A 41 41 0 0 1 18.61361048932142,36.53126749172308 Z" class="tooltip even single"></path>', '<path d="M 48.576983472131516,95.33769808815535 A 107 107 0 0 0 75.66042558696059,75.66042558696059 L 60.10407640085654,60.104076400856535 A 85 85 0 0 1 38.58919247786148,75.73555455601127 Z" class="tooltip even triple"></path>', '<path d="M 68.09857496093203,133.65097862825516 A 150 150 0 0 0 106.06601717798213,106.06601717798212 L 75.66042558696059,75.66042558696059 A 107 107 0 0 1 48.576983472131516,95.33769808815535 Z" class="tooltip even single"></path>', '<path d="M 77.17838495572296,151.47110911202253 A 170 170 0 0 0 120.20815280171308,120.20815280171307 L 106.06601717798213,106.06601717798212 A 150 150 0 0 1 68.09857496093203,133.65097862825516 Z" class="tooltip even double"></path>', '<path d="M 13.296929528419628,83.95350895058671 A 85 85 0 0 0 38.58919247786148,75.73555455601127 L 18.61361048932142,36.53126749172308 A 41 41 0 0 1 6.4138130666494675,40.49522196440065 Z" class="tooltip odd single"></path>', '<path d="M 16.738487759304707,105.68265244367974 A 107 107 0 0 0 48.576983472131516,95.33769808815535 L 38.58919247786148,75.73555455601127 A 85 85 0 0 1 13.296929528419628,83.95350895058671 Z" class="tooltip odd triple"></path>', '<path d="M 23.465169756034637,148.15325108927067 A 150 150 0 0 0 68.09857496093203,133.65097862825516 L 48.576983472131516,95.33769808815535 A 107 107 0 0 1 16.738487759304707,105.68265244367974 Z" class="tooltip odd single"></path>', '<path d="M 26.593859056839257,167.90701790117342 A 170 170 0 0 0 77.17838495572296,151.47110911202253 L 68.09857496093203,133.65097862825516 A 150 150 0 0 1 23.465169756034637,148.15325108927067 Z" class="tooltip odd double"></path>', '<path d="M -13.29692952841962,83.95350895058671 A 85 85 0 0 0 13.296929528419628,83.95350895058671 L 6.4138130666494675,40.49522196440065 A 41 41 0 0 1 -6.413813066649463,40.49522196440065 Z" class="tooltip even single"></path>', '<path d="M -16.738487759304697,105.68265244367974 A 107 107 0 0 0 16.738487759304707,105.68265244367974 L 13.296929528419628,83.95350895058671 A 85 85 0 0 1 -13.29692952841962,83.95350895058671 Z" class="tooltip even triple"></path>', '<path d="M -23.465169756034623,148.15325108927067 A 150 150 0 0 0 23.465169756034637,148.15325108927067 L 16.738487759304707,105.68265244367974 A 107 107 0 0 1 -16.738487759304697,105.68265244367974 Z" class="tooltip even single"></path>', '<path d="M -26.59385905683924,167.90701790117342 A 170 170 0 0 0 26.593859056839257,167.90701790117342 L 23.465169756034637,148.15325108927067 A 150 150 0 0 1 -23.465169756034623,148.15325108927067 Z" class="tooltip even double"></path>', '<path d="M -38.589192477861474,75.73555455601127 A 85 85 0 0 0 -13.29692952841962,83.95350895058671 L -6.413813066649463,40.49522196440065 A 41 41 0 0 1 -18.613610489321417,36.531267491723085 Z" class="tooltip odd single"></path>', '<path d="M -48.5769834721315,95.33769808815536 A 107 107 0 0 0 -16.738487759304697,105.68265244367974 L -13.29692952841962,83.95350895058671 A 85 85 0 0 1 -38.589192477861474,75.73555455601127 Z" class="tooltip odd triple"></path>', '<path d="M -68.09857496093201,133.6509786282552 A 150 150 0 0 0 -23.465169756034623,148.15325108927067 L -16.738487759304697,105.68265244367974 A 107 107 0 0 1 -48.5769834721315,95.33769808815536 Z" class="tooltip odd single"></path>', '<path d="M -77.17838495572295,151.47110911202253 A 170 170 0 0 0 -26.59385905683924,167.90701790117342 L -23.465169756034623,148.15325108927067 A 150 150 0 0 1 -68.09857496093201,133.6509786282552 Z" class="tooltip odd double"></path>', '<path d="M -60.104076400856535,60.10407640085654 A 85 85 0 0 0 -38.589192477861474,75.73555455601127 L -18.613610489321417,36.531267491723085 A 41 41 0 0 1 -28.991378028648445,28.99137802864845 Z" class="tooltip even single"></path>', '<path d="M -75.66042558696059,75.66042558696059 A 107 107 0 0 0 -48.5769834721315,95.33769808815536 L -38.589192477861474,75.73555455601127 A 85 85 0 0 1 -60.104076400856535,60.10407640085654 Z" class="tooltip even triple"></path>', '<path d="M -106.06601717798212,106.06601717798213 A 150 150 0 0 0 -68.09857496093201,133.6509786282552 L -48.5769834721315,95.33769808815536 A 107 107 0 0 1 -75.66042558696059,75.66042558696059 Z" class="tooltip even single"></path>', '<path d="M -120.20815280171307,120.20815280171308 A 170 170 0 0 0 -77.17838495572295,151.47110911202253 L -68.09857496093201,133.6509786282552 A 150 150 0 0 1 -106.06601717798212,106.06601717798213 Z" class="tooltip even double"></path>', '<path d="M -75.73555455601127,38.58919247786148 A 85 85 0 0 0 -60.104076400856535,60.10407640085654 L -28.991378028648445,28.99137802864845 A 41 41 0 0 1 -36.53126749172308,18.61361048932142 Z" class="tooltip odd single"></path>', '<path d="M -95.33769808815535,48.576983472131516 A 107 107 0 0 0 -75.66042558696059,75.66042558696059 L -60.104076400856535,60.10407640085654 A 85 85 0 0 1 -75.73555455601127,38.58919247786148 Z" class="tooltip odd triple"></path>', '<path d="M -133.65097862825516,68.09857496093203 A 150 150 0 0 0 -106.06601717798212,106.06601717798213 L -75.66042558696059,75.66042558696059 A 107 107 0 0 1 -95.33769808815535,48.576983472131516 Z" class="tooltip odd single"></path>', '<path d="M -151.47110911202253,77.17838495572296 A 170 170 0 0 0 -120.20815280171307,120.20815280171308 L -106.06601717798212,106.06601717798213 A 150 150 0 0 1 -133.65097862825516,68.09857496093203 Z" class="tooltip odd double"></path>', '<path d="M -83.9535089505867,13.296929528419634 A 85 85 0 0 0 -75.73555455601127,38.58919247786148 L -36.53126749172308,18.61361048932142 A 41 41 0 0 1 -40.49522196440064,6.41381306664947 Z" class="tooltip even single"></path>', '<path d="M -105.68265244367973,16.738487759304714 A 107 107 0 0 0 -95.33769808815535,48.576983472131516 L -75.73555455601127,38.58919247786148 A 85 85 0 0 1 -83.9535089505867,13.296929528419634 Z" class="tooltip even triple"></path>', '<path d="M -148.15325108927064,23.465169756034648 A 150 150 0 0 0 -133.65097862825516,68.09857496093203 L -95.33769808815535,48.576983472131516 A 107 107 0 0 1 -105.68265244367973,16.738487759304714 Z" class="tooltip even single"></path>', '<path d="M -167.9070179011734,26.593859056839268 A 170 170 0 0 0 -151.47110911202253,77.17838495572296 L -133.65097862825516,68.09857496093203 A 150 150 0 0 1 -148.15325108927064,23.465169756034648 Z" class="tooltip even double"></path>', '<path d="M -83.95350895058671,-13.296929528419613 A 85 85 0 0 0 -83.9535089505867,13.296929528419634 L -40.49522196440064,6.41381306664947 A 41 41 0 0 1 -40.49522196440065,-6.41381306664946 Z" class="tooltip odd single"></path>', '<path d="M -105.68265244367974,-16.73848775930469 A 107 107 0 0 0 -105.68265244367973,16.738487759304714 L -83.9535089505867,13.296929528419634 A 85 85 0 0 1 -83.95350895058671,-13.296929528419613 Z" class="tooltip odd triple"></path>', '<path d="M -148.15325108927067,-23.46516975603461 A 150 150 0 0 0 -148.15325108927064,23.465169756034648 L -105.68265244367973,16.738487759304714 A 107 107 0 0 1 -105.68265244367974,-16.73848775930469 Z" class="tooltip odd single"></path>', '<path d="M -167.90701790117342,-26.593859056839225 A 170 170 0 0 0 -167.9070179011734,26.593859056839268 L -148.15325108927064,23.465169756034648 A 150 150 0 0 1 -148.15325108927067,-23.46516975603461 Z" class="tooltip odd double"></path>',
    '<path d="M -75.73555455601127,-38.58919247786147 A 85 85 0 0 0 -83.95350895058671,-13.296929528419613 L -40.49522196440065,-6.41381306664946 A 41 41 0 0 1 -36.531267491723085,-18.613610489321413 Z" class="tooltip even single"></path>', '<path d="M -95.33769808815536,-48.576983472131495 A 107 107 0 0 0 -105.68265244367974,-16.73848775930469 L -83.95350895058671,-13.296929528419613 A 85 85 0 0 1 -75.73555455601127,-38.58919247786147 Z" class="tooltip even triple"></path>', '<path d="M -133.6509786282552,-68.098574960932 A 150 150 0 0 0 -148.15325108927067,-23.46516975603461 L -105.68265244367974,-16.73848775930469 A 107 107 0 0 1 -95.33769808815536,-48.576983472131495 Z" class="tooltip even single"></path>', '<path d="M -151.47110911202253,-77.17838495572293 A 170 170 0 0 0 -167.90701790117342,-26.593859056839225 L -148.15325108927067,-23.46516975603461 A 150 150 0 0 1 -133.6509786282552,-68.098574960932 Z" class="tooltip even double"></path>', '<path d="M -60.104076400856556,-60.104076400856535 A 85 85 0 0 0 -75.73555455601127,-38.58919247786147 L -36.531267491723085,-18.613610489321413 A 41 41 0 0 1 -28.991378028648455,-28.991378028648445 Z" class="tooltip odd single"></path>', '<path d="M -75.6604255869606,-75.66042558696059 A 107 107 0 0 0 -95.33769808815536,-48.576983472131495 L -75.73555455601127,-38.58919247786147 A 85 85 0 0 1 -60.104076400856556,-60.104076400856535 Z" class="tooltip odd triple"></path>', '<path d="M -106.06601717798215,-106.06601717798212 A 150 150 0 0 0 -133.6509786282552,-68.098574960932 L -95.33769808815536,-48.576983472131495 A 107 107 0 0 1 -75.6604255869606,-75.66042558696059 Z" class="tooltip odd single"></path>', '<path d="M -120.20815280171311,-120.20815280171307 A 170 170 0 0 0 -151.47110911202253,-77.17838495572293 L -133.6509786282552,-68.098574960932 A 150 150 0 0 1 -106.06601717798215,-106.06601717798212 Z" class="tooltip odd double"></path>', '<path d="M -38.58919247786149,-75.73555455601127 A 85 85 0 0 0 -60.104076400856556,-60.104076400856535 L -28.991378028648455,-28.991378028648445 A 41 41 0 0 1 -18.613610489321424,-36.53126749172308 Z" class="tooltip even single"></path>', '<path d="M -48.57698347213152,-95.33769808815535 A 107 107 0 0 0 -75.6604255869606,-75.66042558696059 L -60.104076400856556,-60.104076400856535 A 85 85 0 0 1 -38.58919247786149,-75.73555455601127 Z" class="tooltip even triple"></path>', '<path d="M -68.09857496093204,-133.65097862825516 A 150 150 0 0 0 -106.06601717798215,-106.06601717798212 L -75.6604255869606,-75.66042558696059 A 107 107 0 0 1 -48.57698347213152,-95.33769808815535 Z" class="tooltip even single"></path>', '<path d="M -77.17838495572298,-151.47110911202253 A 170 170 0 0 0 -120.20815280171311,-120.20815280171307 L -106.06601717798215,-106.06601717798212 A 150 150 0 0 1 -68.09857496093204,-133.65097862825516 Z" class="tooltip even double"></path>', '<path d="M -13.296929528419637,-83.9535089505867 A 85 85 0 0 0 -38.58919247786149,-75.73555455601127 L -18.613610489321424,-36.53126749172308 A 41 41 0 0 1 -6.413813066649473,-40.49522196440064 Z" class="tooltip odd single"></path>', '<path d="M -16.73848775930472,-105.68265244367973 A 107 107 0 0 0 -48.57698347213152,-95.33769808815535 L -38.58919247786149,-75.73555455601127 A 85 85 0 0 1 -13.296929528419637,-83.9535089505867 Z" class="tooltip odd triple"></path>', '<path d="M -23.465169756034655,-148.15325108927064 A 150 150 0 0 0 -68.09857496093204,-133.65097862825516 L -48.57698347213152,-95.33769808815535 A 107 107 0 0 1 -16.73848775930472,-105.68265244367973 Z" class="tooltip odd single"></path>', '<path d="M -26.593859056839275,-167.9070179011734 A 170 170 0 0 0 -77.17838495572298,-151.47110911202253 L -68.09857496093204,-133.65097862825516 A 150 150 0 0 1 -23.465169756034655,-148.15325108927064 Z" class="tooltip odd double"></path>', '<path d="M 13.296929528419607,-83.95350895058671 A 85 85 0 0 0 -13.296929528419637,-83.9535089505867 L -6.413813066649473,-40.49522196440064 A 41 41 0 0 1 6.413813066649458,-40.49522196440065 Z" class="tooltip even single"></path>', '<path d="M 16.738487759304682,-105.68265244367974 A 107 107 0 0 0 -16.73848775930472,-105.68265244367973 L -13.296929528419637,-83.9535089505867 A 85 85 0 0 1 13.296929528419607,-83.95350895058671 Z" class="tooltip even triple"></path>', '<path d="M 23.4651697560346,-148.15325108927067 A 150 150 0 0 0 -23.465169756034655,-148.15325108927064 L -16.73848775930472,-105.68265244367973 A 107 107 0 0 1 16.738487759304682,-105.68265244367974 Z" class="tooltip even single"></path>', '<path d="M 26.593859056839214,-167.90701790117342 A 170 170 0 0 0 -26.593859056839275,-167.9070179011734 L -23.465169756034655,-148.15325108927064 A 150 150 0 0 1 23.4651697560346,-148.15325108927067 Z" class="tooltip even double"></path>', '<path d="M 38.58919247786147,-75.73555455601128 A 85 85 0 0 0 13.296929528419607,-83.95350895058671 L 6.413813066649458,-40.49522196440065 A 41 41 0 0 1 18.613610489321413,-36.531267491723085 Z" class="tooltip odd single"></path>', '<path d="M 48.57698347213149,-95.33769808815538 A 107 107 0 0 0 16.738487759304682,-105.68265244367974 L 13.296929528419607,-83.95350895058671 A 85 85 0 0 1 38.58919247786147,-75.73555455601128 Z" class="tooltip odd triple"></path>', '<path d="M 68.098574960932,-133.6509786282552 A 150 150 0 0 0 23.4651697560346,-148.15325108927067 L 16.738487759304682,-105.68265244367974 A 107 107 0 0 1 48.57698347213149,-95.33769808815538 Z" class="tooltip odd single"></path>', '<path d="M 77.17838495572293,-151.47110911202256 A 170 170 0 0 0 26.593859056839214,-167.90701790117342 L 23.4651697560346,-148.15325108927067 A 150 150 0 0 1 68.098574960932,-133.6509786282552 Z" class="tooltip odd double"></path>', '<path d="M 60.10407640085653,-60.104076400856556 A 85 85 0 0 0 38.58919247786147,-75.73555455601128 L 18.613610489321413,-36.531267491723085 A 41 41 0 0 1 28.99137802864844,-28.991378028648455 Z" class="tooltip even single"></path>', '<path d="M 75.66042558696057,-75.6604255869606 A 107 107 0 0 0 48.57698347213149,-95.33769808815538 L 38.58919247786147,-75.73555455601128 A 85 85 0 0 1 60.10407640085653,-60.104076400856556 Z" class="tooltip even triple"></path>', '<path d="M 106.0660171779821,-106.06601717798215 A 150 150 0 0 0 68.098574960932,-133.6509786282552 L 48.57698347213149,-95.33769808815538 A 107 107 0 0 1 75.66042558696057,-75.6604255869606 Z" class="tooltip even single"></path>', '<path d="M 120.20815280171306,-120.20815280171311 A 170 170 0 0 0 77.17838495572293,-151.47110911202256 L 68.098574960932,-133.6509786282552 A 150 150 0 0 1 106.0660171779821,-106.06601717798215 Z" class="tooltip even double"></path>', '<path d="M 75.73555455601127,-38.589192477861495 A 85 85 0 0 0 60.10407640085653,-60.104076400856556 L 28.99137802864844,-28.991378028648455 A 41 41 0 0 1 36.53126749172308,-18.613610489321427 Z" class="tooltip odd single"></path>', '<path d="M 95.33769808815535,-48.57698347213152 A 107 107 0 0 0 75.66042558696057,-75.6604255869606 L 60.10407640085653,-60.104076400856556 A 85 85 0 0 1 75.73555455601127,-38.589192477861495 Z" class="tooltip odd triple"></path>', '<path d="M 133.65097862825516,-68.09857496093204 A 150 150 0 0 0 106.0660171779821,-106.06601717798215 L 75.66042558696057,-75.6604255869606 A 107 107 0 0 1 95.33769808815535,-48.57698347213152 Z" class="tooltip odd single"></path>', '<path d="M 151.47110911202253,-77.17838495572299 A 170 170 0 0 0 120.20815280171306,-120.20815280171311 L 106.0660171779821,-106.06601717798215 A 150 150 0 0 1 133.65097862825516,-68.09857496093204 Z" class="tooltip odd double"></path>', '<path d="M 83.9535089505867,-13.296929528419644 A 85 85 0 0 0 75.73555455601127,-38.589192477861495 L 36.53126749172308,-18.613610489321427 A 41 41 0 0 1 40.49522196440064,-6.4138130666494755 Z" class="tooltip even single"></path>', '<path d="M 105.68265244367973,-16.73848775930473 A 107 107 0 0 0 95.33769808815535,-48.57698347213152 L 75.73555455601127,-38.589192477861495 A 85 85 0 0 1 83.9535089505867,-13.296929528419644 Z" class="tooltip even triple"></path>', '<path d="M 148.15325108927064,-23.46516975603467 A 150 150 0 0 0 133.65097862825516,-68.09857496093204 L 95.33769808815535,-48.57698347213152 A 107 107 0 0 1 105.68265244367973,-16.73848775930473 Z" class="tooltip even single"></path>', '<path d="M 167.9070179011734,-26.59385905683929 A 170 170 0 0 0 151.47110911202253,-77.17838495572299 L 133.65097862825516,-68.09857496093204 A 150 150 0 0 1 148.15325108927064,-23.46516975603467 Z" class="tooltip even double"></path>'
];
var dart_board_numbers = [6, 13, 4, 18, 1, 20, 5, 12, 9, 14, 11, 8, 16, 7, 19, 3, 17, 2, 15, 10];
//CRICKET INFO
var BULLSEYE = "BE";
var CRICKET_ROWS = ["15", "16", "17", "18", "19", "20", BULLSEYE];
var player_cricket_hits_counter = [{}, {}];
// STANDARD DART INFO
var NUM_THROWS_PER_TURN = 3;
var num_players = 2; //keeping this lowercase because it might not be FINAL at some point //TODO this will be dynamic when users can add/subtract players
// DATA TO KEEP TRACK OF DURING THE GAME
var cur_throw = 0; //increment each throw, mod by NUM_THROWS_PER_TURN - 1
var cur_turn = 0; //0 means it's the first players turn. increment and mod by num_players each throw
var cur_starting_score, cur_temp_score;
var player_names = [];
var player_scores = [], game_starting_score;
var player_all_throws = [];
var player_all_throws_this_game = [];
var player_wins = [0, 0];
var player_cur_throws = [];
var BLACK_DOT = "\u25CF";
var game_is_active = false;
var heat_map_is_displayed = false;
var heat_map_player_id;
var must_win_on_double; //ONLY IMPORTANT IN CLASSIC GAMES
var game_type, cricket_mode;
var GAME_TYPE;
(function (GAME_TYPE) {
    GAME_TYPE["CLASSIC"] = "0";
    GAME_TYPE["CRICKET"] = "1";
})(GAME_TYPE || (GAME_TYPE = {}));
var CRICKET_GAME_MODE;
(function (CRICKET_GAME_MODE) {
    CRICKET_GAME_MODE["HOUSE"] = "0";
    CRICKET_GAME_MODE["STANDARD"] = "1";
})(CRICKET_GAME_MODE || (CRICKET_GAME_MODE = {}));
// FRONT PAGE CODE
function set_game_type_element() {
    var game_select_value = get_game_type();
    if (game_select_value === GAME_TYPE.CLASSIC) { //classic game
        game_type = GAME_TYPE.CLASSIC;
        write_classic_game_options_html();
    }
    else if (game_select_value === GAME_TYPE.CRICKET) { //cricket
        game_type = GAME_TYPE.CRICKET;
        write_cricket_game_options_html();
    }
}
function get_game_type() {
    return document.getElementById("game_select").value;
}
function write_classic_game_options_html() {
    var game_option_container = document.getElementById('game_option_container');
    // STARTNG POINT TOTAL SECTION
    var innerHTML_text = '<span>Starting Point Total</span><br>';
    for (var i = 1; i <= 5; i++) {
        var cur_total = -100 + (200 * i) + 1;
        if (i != 3) {
            innerHTML_text += ('<input type="radio" id="game_option_number_' + i + '" name="game_option_item" class="game_option_item" value="' + cur_total + '" />');
        }
        else {
            innerHTML_text += ('<input type="radio" id="game_option_number_' + i + '" name="game_option_item" class="game_option_item" value="' + cur_total + '" checked/>');
        }
        innerHTML_text += ('<label for="game_option_number_' + i + '" style="width: 16%;">' + cur_total + '</label>');
    }
    // MUST WIN ON DOUBLE SECTION
    innerHTML_text += '<br>';
    innerHTML_text += '<input class="game_option_item" type="checkbox" id="must_win_on_double" name="must_win_on_double" value="must_win_on_double" checked>';
    innerHTML_text += '<label for="must_win_on_double">Must Win On Double</label><br>';
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
    var dart_board_container = document.getElementById("dart_board");
    var innerHTML_text = '<svg id="dart_board_svg" viewBox="0 0 420 420" class="dartboard" onclick="dart_hit(\'' + 0 + '\')">';
    innerHTML_text += '<g transform="translate(210, 210) scale(1, -1)">';
    innerHTML_text += '<circle class="out" cx="0" cy="0" r="9999"></circle>';
    //bullseye parts
    innerHTML_text += '<circle id="sb" class="tooltip single-bull" cx="0" cy="0" r="41" onclick="dart_hit(\'sb\')"></circle>';
    innerHTML_text += '<circle id="db" class="tooltip double-bull" cx="0" cy="0" r="16" onclick="dart_hit(\'db\')"></circle>';
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 4; j++) {
            var cur_html = dart_board_data[4 * i + j];
            var split_html = cur_html.split("><");
            var id = "id=\'" + i + "_" + j + "\'";
            var onclick = 'onclick="dart_hit(\'' + j + "_" + dart_board_numbers[i] + '\');"';
            var title = "title=\'" + i + "_" + j + "\'";
            innerHTML_text += split_html[0] + id + onclick + title + '><' + split_html[1];
        }
    }
    innerHTML_text += "</g>";
    //BUILD THE NUMBERS
    innerHTML_text += '<g transform="translate(210, 210)">';
    for (var i = 0; i < 20; i++) {
        var cur_number = dart_board_numbers[i];
        var cur_rotation = 90 - (18 * i);
        innerHTML_text += '<text class="number" x="0" y="-180" transform="rotate(' + cur_rotation + ', 0, 0)">' + cur_number + '</text>';
    }
    innerHTML_text += '</g>';
    innerHTML_text += "</svg>";
    //SET THE HTML
    dart_board_container.innerHTML = innerHTML_text;
}
//GAME CODE
function set_up_and_start_game() {
    var game_type = get_game_type();
    if (game_type === GAME_TYPE.CRICKET) {
        cricket_mode = CRICKET_GAME_MODE.HOUSE; //TODO: CHANGE TO ADD OTHER CRICKET MODE OPTION
    }
    // CHANGE LAYOUT
    document.getElementById('description').setAttribute('hidden', "true");
    document.getElementById('dart_board_display_container').removeAttribute('hidden');
    document.getElementById('start_form').setAttribute('hidden', "true");
    document.getElementById('game_text_container').removeAttribute('hidden');
    document.getElementById('game_data_table').removeAttribute('hidden');
    if (game_type === GAME_TYPE.CRICKET) {
        for (var i = 0; i < num_players; i++) {
            document.getElementById('player_' + (i + 1) + '_average_score_this_game').setAttribute('hidden', 'true');
            document.getElementById('player_' + (i + 1) + '_average_score').setAttribute('hidden', 'true');
        }
    }
    // GET INFO FROM FORM 
    // SET NAMES
    for (var i = 0; i < num_players; i++) {
        var cur_player_name = document.getElementById('player_' + (i + 1) + '_name_input').value;
        if (cur_player_name.trim() == "") {
            cur_player_name = "Player " + (i + 1);
        }
        player_names.push(cur_player_name);
        document.getElementById('player_' + (i + 1) + '_name').innerHTML = cur_player_name;
    }
    // SET SCORES, WHICH ARE DEPENDANT ON GAME_TYPE
    if (game_type === GAME_TYPE.CLASSIC) {
        var inputs = document.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type === 'radio' && inputs[i].checked) {
                // get value, set checked flag or do whatever you need to
                game_starting_score = inputs[i].value;
            }
            else if (inputs[i].type === 'checkbox') {
                if (inputs[i].value === "must_win_on_double") {
                    if (inputs[i].checked) {
                        must_win_on_double = true;
                    }
                    else {
                        must_win_on_double = false;
                    }
                }
            }
        }
        for (var i = 0; i < num_players; i++) {
            player_scores.push(game_starting_score);
        }
        display_updated_scores();
        display_updated_score_list(cur_turn, game_starting_score);
    }
    else if (game_type === "1") { // CRICKET GAME
        //make the cricket game score system
        set_up_cricket_table();
    }
    // SET UP PLAYER DATA
    for (var i = 0; i < num_players; i++) {
        player_all_throws.push([]);
        player_all_throws_this_game.push([]);
        display_average_throw(i);
    }
    // SET UP HEAT MAP SECTION
    var heat_map_button_section = document.getElementById('board_display_options_container');
    var innerHTML_text = '<form>';
    for (var i = 0; i < num_players; i++) {
        innerHTML_text += '<button class="button" type="button" id="heat_map_button_' + i + '" onclick="display_heat_map(' + i + ');">Heat Map for ' + player_names[i] + '</button>';
    }
    innerHTML_text += '<button class="button" type="button" id="undo_button" onclick="undo_last_throw();">Undo Throw</button>';
    innerHTML_text += '</form>';
    heat_map_button_section.innerHTML = innerHTML_text;
    // SET UP TOOLTIPS
    // spokes
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 3; j++) {
            cur_element = document.getElementById(i + "_" + j);
            cur_element.addEventListener('mouseover', function_to_display_hit_count(0));
        }
    }
    // bullseye
    cur_element = document.getElementById('sb');
    cur_element.addEventListener('mouseover', function_to_display_hit_count(0));
    cur_element = document.getElementById('db');
    cur_element.addEventListener('mouseover', function_to_display_hit_count(0));
    game_is_active = true;
    begin_turn(0);
}
function play_darts_again() {
    //clear all the displays
    document.getElementById('victory_text_container').setAttribute("hidden", "true");
    if (game_type == GAME_TYPE.CLASSIC) {
        clear_score_list();
        //reset all the values
        player_all_throws_this_game = [];
        for (var i = 0; i < num_players; i++) {
            player_scores[i] = game_starting_score;
            clear_cur_throws(i);
            player_all_throws_this_game.push([]);
            display_average_throw(i);
        }
        player_cur_throws = [];
        //display the proper thigns
        display_updated_scores();
        display_updated_score_list(cur_turn, game_starting_score);
    }
    else if (game_type === GAME_TYPE.CRICKET) {
        clear_cricket_scores();
        //reset all the values
        player_all_throws_this_game = [];
        player_cricket_hits_counter = [];
        for (var i = 0; i < num_players; i++) {
            clear_cur_throws(i);
            player_all_throws_this_game.push([]);
            player_cricket_hits_counter.push({});
        }
        set_up_player_cricket_hits_counter();
        player_cur_throws = [];
    }
    //start the game
    game_is_active = true;
    begin_turn(0);
}
function clear_cricket_scores() {
    var table = document.getElementById("score_list_table");
    for (var i = 0; i < table.rows.length; i++) {
        var innerHTML_text = (table.rows[i].childNodes[1]).innerHTML; //second value is the middle of the table
        if (CRICKET_ROWS.includes(innerHTML_text)) {
            (table.rows[i].childNodes[0]).innerHTML = "";
            (table.rows[i].childNodes[2]).innerHTML = "";
        }
    }
}
function begin_turn(player_id) {
    cur_turn = player_id;
    display_cur_throws(player_id);
    if (game_type === GAME_TYPE.CLASSIC) {
        display_average_throw(player_id);
        cur_starting_score = player_scores[player_id];
        cur_temp_score = cur_starting_score;
    }
    else if (game_type === GAME_TYPE.CRICKET) {
        //TODO: this might be important for UNDO 
        //update: don't think it is, since you can't bust in cricket?
    }
    else {
        console.log("ERROR: invalid game type");
    }
}
function display_cur_throws(player_id) {
    var cur_throws_element = document.getElementById('player_' + (player_id + 1) + '_throws_cur_turn');
    var cur_html;
    if (player_cur_throws.length == 0) {
        cur_html = BLACK_DOT;
    }
    else {
        cur_html = player_cur_throws[0];
    }
    for (var i = 1; i < NUM_THROWS_PER_TURN; i++) {
        if (i < player_cur_throws.length) {
            cur_html += " " + player_cur_throws[i];
        }
        else {
            cur_html += " " + BLACK_DOT;
        }
    }
    cur_throws_element.innerHTML = cur_html;
}
function clear_cur_throws(player_id) {
    document.getElementById('player_' + (player_id + 1) + '_throws_cur_turn').innerHTML = "";
}
function display_average_throw(player_id) {
    var sum_of_throws = player_all_throws[player_id].map(get_score_of_hit_at).reduce(function (a, b) { return a + b; }, 0);
    var total_num_throws = player_all_throws[player_id].length;
    var average_throw = total_num_throws === 0 ? 0 : sum_of_throws / total_num_throws;
    document.getElementById('player_' + (player_id + 1) + '_average_score').innerHTML = "Overall Average: " + average_throw.toFixed(2);
    sum_of_throws = player_all_throws_this_game[player_id].map(get_score_of_hit_at).reduce(function (a, b) { return a + b; }, 0);
    total_num_throws = player_all_throws_this_game[player_id].length;
    average_throw = total_num_throws === 0 ? 0 : sum_of_throws / total_num_throws;
    document.getElementById('player_' + (player_id + 1) + '_average_score_this_game').innerHTML = "Game Average: " + average_throw.toFixed(2);
}
function display_updated_score_list(player_id, first_display) {
    if (first_display === void 0) { first_display = false; }
    var table = document.getElementById("score_list_table");
    if (first_display) {
        var row = table.insertRow();
        var headerCell1 = document.createElement("th");
        headerCell1.innerHTML = player_scores[0];
        headerCell1.style.borderRight = "2px dotted";
        var headerCell2 = document.createElement("th");
        headerCell2.innerHTML = player_scores[1];
        row.appendChild(document.createElement("td"));
        row.appendChild(headerCell1);
        row.appendChild(headerCell2);
        row.appendChild(document.createElement("td"));
    }
    else {
        var row = player_id === 0 ? table.insertRow() : table.rows[table.rows.length - 1];
        var dataCell, headerCell;
        if (player_id == 0) { //add td, th, blank, blank
            dataCell = document.createElement("td");
            dataCell.innerHTML = cur_starting_score - player_scores[player_id];
            headerCell = document.createElement("th");
            headerCell.innerHTML = player_scores[player_id];
            headerCell.style.borderRight = "2px dotted";
            row.appendChild(dataCell);
            row.appendChild(headerCell);
        }
        else if (player_id == 1) { //add th, td
            dataCell = document.createElement("td");
            dataCell.innerHTML = cur_starting_score - player_scores[player_id];
            headerCell = document.createElement("th");
            headerCell.innerHTML = player_scores[player_id];
            row.appendChild(headerCell);
            row.appendChild(dataCell);
        }
    }
}
function set_up_cricket_table() {
    var table = document.getElementById("score_list_table");
    var name_row = table.insertRow();
    var name_1_cell = document.createElement("th");
    name_1_cell.innerHTML = player_names[0];
    var name_2_cell = document.createElement("th");
    name_2_cell.innerHTML = player_names[1];
    name_row.appendChild(name_1_cell);
    name_row.appendChild(document.createElement("td"));
    name_row.appendChild(name_2_cell);
    var bullseye_row = table.insertRow();
    bullseye_row.appendChild(document.createElement("td"));
    var bullseye_name_cell = document.createElement("th");
    bullseye_name_cell.innerHTML = BULLSEYE;
    bullseye_row.appendChild(bullseye_name_cell);
    bullseye_row.appendChild(document.createElement("td"));
    for (var i = 20; i >= 15; i--) {
        var next_row = table.insertRow();
        next_row.appendChild(document.createElement("td"));
        var next_row_cell = document.createElement("th");
        next_row_cell.innerHTML = "" + i;
        next_row.appendChild(next_row_cell);
        next_row.appendChild(document.createElement("td"));
    }
    //set up player_cricket_hits_counter
    set_up_player_cricket_hits_counter();
}
function set_up_player_cricket_hits_counter() {
    for (var i = 0; i < num_players; i++) {
        for (var j = 20; j >= 15; j--) {
            player_cricket_hits_counter[i]["" + j] = 0;
        }
        player_cricket_hits_counter[i][BULLSEYE] = 0;
    }
}
function clear_score_list() {
    document.getElementById("score_list_table").innerHTML = "";
}
var scored = false;
function dart_hit(raw_board_location) {
    // console.log(raw_board_location);
    if (game_is_active) {
        // console.log("dart hit", raw_board_location);
        if (raw_board_location != "0") { //hit the target somewhere, not the outside area
            scored = true;
            //process hit location
            process_hit(raw_board_location);
        }
        else if (scored) { //the outside hit gets called even if the main board is also hit, so this ignores those calls and resets
            scored = false;
        }
        else { //count it as a 0
            //process hit location
            process_hit(raw_board_location);
        }
    }
    else {
        console.log("game is paused");
    }
}
function get_cleaned_board_location(raw_board_location) {
    if (raw_board_location === "sb") {
        return "25";
    }
    else if (raw_board_location === "db") {
        return "50";
    }
    else if (raw_board_location === "0") {
        return "0";
    }
    var location_list = raw_board_location.split("_");
    if (location_list[0] == "0" || location_list[0] == "2") {
        return location_list[1];
    }
    else if (location_list[0] === "1") {
        return "T" + location_list[1];
    }
    else if (location_list[0] === "3") {
        return "D" + location_list[1];
    }
    else {
        console.log("ERROR: INVALID BOARD LOCATION");
        return "-1";
    }
}
function process_hit(raw_board_location) {
    var cleaned_board_location = get_cleaned_board_location(raw_board_location);
    player_cur_throws.push(cleaned_board_location);
    player_all_throws[cur_turn].push(raw_board_location);
    player_all_throws_this_game[cur_turn].push(raw_board_location);
    display_cur_throws(cur_turn);
    if (game_type === GAME_TYPE.CLASSIC) {
        display_average_throw(cur_turn);
        cur_temp_score -= get_score_of_hit_at(cleaned_board_location);
        display_updated_scores(cur_temp_score);
        if (must_win_on_double && cur_temp_score <= 1) {
            if (cur_temp_score === 1) {
                //busted
                cur_temp_score = -1; //this will simulate busting
                // TODO: //add 0 throws so that the turn finished and can be undone
                // if (player_cur_throws.length < 3) {
                //     dart_hit("0");
                // }
            }
            else if (cur_temp_score === 0) {
                var most_recent_throw = player_cur_throws[player_cur_throws.length - 1];
                if (most_recent_throw.charAt(0) === "D" || most_recent_throw === "50") {
                    cur_temp_score = 0; //simulates winning
                }
                else {
                    cur_temp_score = -1; //simulates busting
                }
            }
        }
        if (player_cur_throws.length >= NUM_THROWS_PER_TURN || cur_temp_score <= 0) {
            //TURN IS OVER, PROCESS TURN
            // PROCESS THROWS, SUBTRACT FROM TRUE SCORE IF VALID, ADD TO THROWS LIST
            if (cur_temp_score < 0) {
                //BUSTED
                //don't set the score to be the cur_temp_score
                //add extra throws to fix the undo bug
                while (player_cur_throws.length < 3) {
                    player_all_throws[cur_turn].push("0");
                    player_all_throws_this_game[cur_turn].push("0");
                    player_cur_throws.push("0");
                }
            }
            else if (cur_temp_score === 0) {
                //player [cur_turn] wins!
                //display something nice, increment win counter, show a 'start new game' button
                return game_over_player_wins(cur_turn);
            }
            else {
                player_scores[cur_turn] = cur_temp_score;
            }
            display_updated_scores();
            display_updated_score_list(cur_turn);
            // CHANGE CUR_TURN, RESET CUR DATA
            cur_turn = (cur_turn + 1) % num_players;
            player_cur_throws = [];
            begin_turn(cur_turn);
        }
    }
    else if (game_type === GAME_TYPE.CRICKET) {
        //handle cricket throw
        if (cricket_mode === CRICKET_GAME_MODE.HOUSE) {
            var cricket_points = get_cricket_points(raw_board_location);
            var cricket_bucket = get_cricket_bucket(raw_board_location);
            player_cricket_hits_counter[cur_turn][cricket_bucket] += cricket_points;
            // if (raw_board_location === "sb" || raw_board_location === "db") {
            //     player_cricket_hits_counter[cur_turn][BULLSEYE] += cricket_points;
            // } else if (raw_board_location.includes("_")) {
            //     var raw_split = raw_board_location.split("_");
            //     player_cricket_hits_counter[cur_turn][raw_split[1]] += cricket_points;
            // }
            //update display
            update_cricket_display(cur_turn);
            if (check_cricket_win(cur_turn)) {
                //display victory
                //ask to play a new game
                return game_over_player_wins(cur_turn);
            }
            else if (player_cur_throws.length >= NUM_THROWS_PER_TURN) {
                // CHANGE CUR_TURN, RESET CUR DATA
                cur_turn = (cur_turn + 1) % num_players;
                player_cur_throws = [];
                begin_turn(cur_turn);
            }
        }
    }
}
function get_cricket_bucket(raw_board_location) {
    if (raw_board_location === "sb" || raw_board_location === "db") {
        return BULLSEYE;
    }
    else if (raw_board_location.includes("_")) {
        return raw_board_location.split("_")[1];
    }
}
function get_cricket_points(raw_board_location) {
    if (raw_board_location === "sb") {
        return 1;
    }
    else if (raw_board_location === "db") {
        return 2;
    }
    else if (raw_board_location === "0") {
        return 0;
    }
    else if (raw_board_location.includes("_")) {
        var raw_split = raw_board_location.split("_");
        return (raw_split[0] === "0" || raw_split[0] === "2") ? 1 : (raw_split[0] === "1" ? 3 : (raw_split[0] === "3" ? 2 : 0));
    }
    console.log("ERROR: invalid board location");
    return -1;
}
function update_cricket_display(player_id) {
    var table = document.getElementById("score_list_table");
    for (var i = 0; i < table.rows.length; i++) {
        var innerHTML_text = (table.rows[i].childNodes[1]).innerHTML; //second value is the middle of the table
        if (CRICKET_ROWS.includes(innerHTML_text)) {
            var row_display;
            var num_hits = player_cricket_hits_counter[player_id][innerHTML_text];
            if (num_hits === 0) {
                row_display = "";
            }
            else if (num_hits === 1) {
                row_display = "\\";
            }
            else if (num_hits === 2) {
                row_display = "X";
            }
            else if (num_hits >= 3) {
                row_display = "0";
            }
            (table.rows[i].childNodes[player_id * 2]).innerHTML = row_display;
        }
    }
}
function check_cricket_win(player_id) {
    for (var i = 0; i < CRICKET_ROWS.length; i++) {
        console.log(CRICKET_ROWS);
        if (player_cricket_hits_counter[player_id][CRICKET_ROWS[i]] < 3) {
            return false;
        }
    }
    return true;
}
function game_over_player_wins(player_id) {
    if (game_type === GAME_TYPE.CLASSIC) {
        player_scores[cur_turn] = cur_temp_score;
        display_updated_scores();
        display_updated_score_list(cur_turn);
    }
    document.getElementById('victory_text_container').removeAttribute("hidden");
    document.getElementById('victory_text').innerHTML = "Congratulations " + player_names[player_id] + ", you win!";
    player_wins[player_id] += 1;
    document.getElementById('player_' + (player_id + 1) + '_name').innerHTML = player_names[player_id] + " " + BLACK_DOT + " " + player_wins[player_id];
    game_is_active = false;
}
function display_updated_scores(cur_score_of_cur_player) {
    if (cur_score_of_cur_player === void 0) { cur_score_of_cur_player = null; }
    var cur_player_score;
    if (cur_score_of_cur_player) { //middle of a turn, use passed in parameter for cur players score
        for (var i = 0; i < num_players; i++) {
            if (i === cur_turn) {
                cur_player_score = cur_score_of_cur_player;
            }
            else {
                cur_player_score = player_scores[i];
            }
            document.getElementById('player_' + (i + 1) + '_score').innerHTML = cur_player_score;
        }
    }
    else { //game is being set up or end of a turn, use both players cur scores
        for (var i = 0; i < num_players; i++) {
            cur_player_score = player_scores[i];
            document.getElementById('player_' + (i + 1) + '_score').innerHTML = cur_player_score;
        }
    }
}
function display_heat_map(player_id) {
    if (heat_map_is_displayed) {
        if (heat_map_player_id === player_id) {
            //close the heat map:
            //revert colors
            reset_board_colors();
            //change the color of the heat map button for player_id back to normal
            document.getElementById("heat_map_button_" + player_id).classList.toggle("highlighted_button");
            //set heat_map_is_displayed to be false
            heat_map_is_displayed = false;
            //clear heat_map_player_id
            heat_map_player_id = null;
            //unpause the game
            game_is_active = true;
        }
        else {
            //change the color of the heat map button for heat_map_player_id back to normal
            document.getElementById("heat_map_button_" + heat_map_player_id).classList.toggle("highlighted_button");
            //change the color of the heat map button for player_id to highlighted
            document.getElementById("heat_map_button_" + player_id).classList.toggle("highlighted_button");
            //change heat_map_player_id
            heat_map_player_id = player_id;
            //change the heat map to be the other players throws
            set_board_colors_to_heat_map(heat_map_player_id);
            //keep the game paused
            //keep heat_map_is_displayed true
        }
    }
    else {
        //change the color of the heat map button for player_id to highlighted
        document.getElementById("heat_map_button_" + player_id).classList.toggle("highlighted_button");
        //set heat_map_player_id
        heat_map_player_id = player_id;
        //set the heat map to be player_id's throws
        set_board_colors_to_heat_map(player_id); //this passes in all throws; could have another button just for throws this game
        //pause the game
        game_is_active = false;
        //set heat_map_is_displayed to be true
        heat_map_is_displayed = true;
    }
}
function reset_board_colors() {
    var cur_element;
    //spokes
    var paths = document.getElementsByTagName('path');
    for (var i = 0; i < paths.length; i++) {
        paths[i].style.fill = "";
    }
    //bullseys
    var circles = document.getElementsByTagName('circle');
    for (var i = 0; i < circles.length; i++) {
        circles[i].style.fill = "";
    }
}
function set_board_colors_to_heat_map(player_id) {
    var cur_element, multiplier_text, board_location;
    var frequency_dict = get_frequencies_as_dict(player_all_throws[player_id]);
    var max_value_in_frequency_dict = get_max_value_in_dict(frequency_dict);
    //set spokes
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 4; j++) {
            cur_element = document.getElementById(i + "_" + j);
            board_location = j + "_" + dart_board_numbers[i];
            set_color_to_element(cur_element, board_location, frequency_dict, max_value_in_frequency_dict);
        }
    }
    //set bullseys
    set_color_to_element(document.getElementById("sb"), "sb", frequency_dict, max_value_in_frequency_dict);
    set_color_to_element(document.getElementById("db"), "db", frequency_dict, max_value_in_frequency_dict);
}
function set_color_to_element(cur_element, board_location, frequency_dict, max_value_in_frequency_dict) {
    cur_element.addEventListener('mouseover', function_to_display_hit_count(board_location in frequency_dict ? frequency_dict[board_location] : "0"));
    if (board_location in frequency_dict) {
        cur_element.style.fill = heatMapColorforValue(frequency_dict[board_location] / max_value_in_frequency_dict);
    }
    else {
        cur_element.style.fill = heatMapColorforValue(0);
    }
}
function function_to_display_hit_count(hit_count) {
    function display_hit_count() {
        var instances = $.tooltipster.instances();
        if (heat_map_is_displayed) {
            $.each(instances, function (i, instance) {
                instance.enable();
                instance.content(hit_count);
            });
        }
        else {
            $.each(instances, function (i, instance) {
                instance.disable();
            });
        }
    }
    return display_hit_count;
}
function set_tooltips() {
    $('.tooltip').tooltipster({
        theme: 'tooltipster-punk',
        contentAsHTML: true
    });
}
function get_frequencies_as_dict(list_in) {
    var dict = {};
    for (var i = 0; i < list_in.length; i++) {
        if (list_in[i] in dict) {
            dict[list_in[i]] += 1;
        }
        else {
            dict[list_in[i]] = 1;
        }
    }
    return dict;
}
function get_max_value_in_dict(dict_in) {
    if (dict_in.length === 0) {
        return 1; //because we don't want to divide by 0
    }
    var max_value = Number.MIN_VALUE;
    for (var key in dict_in) {
        if (key != "0") {
            var value = dict_in[key];
            if (value > max_value) {
                max_value = value;
            }
        }
    }
    return max_value;
}
function get_score_of_hit_at(board_location) {
    if (board_location === "0") {
        return 0;
    }
    else if (board_location === "sb") {
        return 25;
    }
    else if (board_location === "db") {
        return 50;
    }
    else if (board_location.includes("_")) { //clean the location first
        return get_score_of_hit_at(get_cleaned_board_location(board_location));
    }
    else if (board_location.charAt(0) === "D") {
        return parseInt(board_location.substring(1)) * 2;
    }
    else if (board_location.charAt(0) === "T") {
        return parseInt(board_location.substring(1)) * 3;
    }
    else {
        return parseInt(board_location);
    }
}
// CODE FROM https://stackoverflow.com/questions/12875486/what-is-the-algorithm-to-create-colors-for-a-heatmap
function heatMapColorforValue(value) {
    var h = (1.0 - value) * 240;
    return "hsl(" + h + ", 100%, 50%)";
}
function undo_last_throw() {
    //if game hasn't started yet, do nothing
    if (cur_turn === 0 && player_all_throws_this_game[cur_turn].length === 0) {
        //do nothing, maybe add an alert or something in the future
        alert("Error: game has not started yet");
    }
    else { //if game has started:
        if (game_type === GAME_TYPE.CLASSIC) {
            //if cur_throws is empty: 
            if (player_cur_throws.length === 0) {
                //cur_turn -= 1 (don't let it be negative)
                cur_turn = (cur_turn - 1 + num_players) % num_players;
                //remove the last table entry (might be complicated, changes if its player one or two)
                remove_last_table_entry(cur_turn);
                //get the last three throws made by the new cur_turn player
                //remove them from all_throws and all_game_throws
                var last_three_throws_raw = player_all_throws[cur_turn].splice(-3, 3);
                player_all_throws_this_game[cur_turn].splice(-3, 3);
                //get prev_score, subtract the previous score from the score_total 
                var prev_score = last_three_throws_raw.map(get_score_of_hit_at).reduce(function (a, b) { return a + b; }, 0);
                player_scores[cur_turn] += prev_score;
                //simulate the first two throws happening again
                begin_turn(cur_turn);
                dart_hit(last_three_throws_raw[0]);
                dart_hit(last_three_throws_raw[1]);
            }
            else { //else (cur_throws is not empty):
                //remove last throw from all_throws, all_game_throws, cur_throws
                var last_throw_raw = player_all_throws[cur_turn].pop();
                player_all_throws_this_game[cur_turn].pop();
                player_cur_throws.pop();
                cur_temp_score += get_score_of_hit_at(last_throw_raw);
                //display everything
                display_cur_throws(cur_turn);
                display_average_throw(cur_turn);
                display_updated_scores(cur_temp_score);
            }
        }
        else if (game_type === GAME_TYPE.CRICKET) {
            if (player_cur_throws.length === 0) {
                //cur_turn -= 1 (don't let it be negative)
                cur_turn = (cur_turn - 1 + num_players) % num_players;
                //remove last three throws, simulate the first two:
                //remove from player_all, player_game, and player_cricket dictionary
                var last_three_throws_raw = player_all_throws[cur_turn].splice(-3, 3);
                player_all_throws_this_game[cur_turn].splice(-3, 3);
                for (var i = 0; i < last_three_throws_raw.length; i++) {
                    player_cricket_hits_counter[cur_turn][get_cricket_bucket(last_three_throws_raw[i])] -= get_cricket_points(last_three_throws_raw[i]);
                }
                //simulate the first two throws
                begin_turn(cur_turn);
                dart_hit(last_three_throws_raw[0]);
                dart_hit(last_three_throws_raw[1]);
            }
            else {
                //remove last throw
                var last_throw_raw = player_all_throws[cur_turn].pop();
                player_all_throws_this_game[cur_turn].pop();
                player_cur_throws.pop();
                //subtract from player_cricket dictionary
                player_cricket_hits_counter[cur_turn][get_cricket_bucket(last_throw_raw)] -= get_cricket_points(last_throw_raw);
                update_cricket_display(cur_turn);
                //update cur_throws
                display_cur_throws(cur_turn);
            }
        }
    }
}
function remove_last_table_entry(player_id) {
    var table = document.getElementById("score_list_table");
    var row = table.rows[table.rows.length - 1];
    if (player_id === 0) {
        //remove the entire row
        table.tBodies[0].removeChild(row);
    }
    else if (player_id === 1) {
        //remove the last two cells
        //one for the TH, one for the TD
        row.removeChild(row.childNodes[row.childNodes.length - 1]);
        row.removeChild(row.childNodes[row.childNodes.length - 1]);
    }
    else {
        console.log("Error, invalid player_id");
    }
}
/*
TODO LIST
fix the undo bug that happens when you bust before your third turn and then try to undo
    solution idea is to add zeros to your throw history for each missing throw
    won't work to simulate dart hit because the zero catcher thing is difficult, maybe just add straight to the arrays
add advanced stats
make everything look nicer
make submit button check to see if everything has been filled out
    maybe use "required" tag on form elements
    not really urgent or important, but might be good if i add more customizable options for games

DONE LIST
make left side into a dart board √
make right side into player names √
add option for win-on-double, win-on-anything √
add an undo button √
add a heat map for the board √
    maybe a dropdown menu type thing, similar to the example in letter_game [didn't do]
add cricket √
add wins display √
*/ 
//# sourceMappingURL=darts.js.map