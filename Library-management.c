#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Book {
    int id;
    char title[100];
    char author[50];
    int copies;
};

void addBook();
void viewBooks();
void searchBook();
void borrowBook();
void returnBook();

int main() {
    int choice;
    do {
        printf("\nLibrary Management System\n");
        printf("1. Add Book\n");
        printf("2. View Books\n");
        printf("3. Search Book\n");
        printf("4. Borrow Book\n");
        printf("5. Return Book\n");
        printf("0. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1: addBook(); break;
            case 2: viewBooks(); break;
            case 3: searchBook(); break;
            case 4: borrowBook(); break;
            case 5: returnBook(); break;
            case 0: printf("Exiting...\n"); break;
            default: printf("Invalid choice! Try again.\n");
        }
    } while (choice != 0);

    return 0;
}

void addBook() {
    FILE *file = fopen("books.dat", "ab");
    struct Book book;

    printf("Enter Book ID: ");
    scanf("%d", &book.id);
    printf("Enter Book Title: ");
    scanf(" %[^\n]", book.title);
    printf("Enter Book Author: ");
    scanf(" %[^\n]", book.author);
    printf("Enter Number of Copies: ");
    scanf("%d", &book.copies);

    fwrite(&book, sizeof(book), 1, file);
    fclose(file);

    printf("Book added successfully!\n");
}

void viewBooks() {
    FILE *file = fopen("books.dat", "rb");
    struct Book book;

    if (!file) {
        printf("No books available.\n");
        return;
    }

    printf("\nID\tTitle\t\tAuthor\t\tCopies\n");
    while (fread(&book, sizeof(book), 1, file)) {
        printf("%d\t%s\t\t%s\t\t%d\n", book.id, book.title, book.author, book.copies);
    }
    fclose(file);
}

// Add other functions for search, borrow, and return.

