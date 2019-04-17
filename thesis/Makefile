TARGET=dom_firewall
include Makefile.include

INCLUDEDGRAPHS = $(shell grep '^[^%]*\\includegraphics[^{]*{' $(INCLUDEDTEX) | \
			 grep -o '\\includegraphics[^{]*{[^}]\+}' | \
			 sed -e 's/^[^%]*\\includegraphics[^{]*{\([^}]*\)}.*/\1/' \
			     -e 's/, */ /g')

# add .pdf to all the files found in \includegraphics sections
PDFGRAPHS = $(INCLUDEDGRAPHS:=.pdf)

EXTRADEPS=
# EXTRADEPS=usenix.sty

# Add dependency on graphs contained in the paper
$(PDFTARGETS): $(INCLUDEDGRAPHS) $(EXTRADEPS)
